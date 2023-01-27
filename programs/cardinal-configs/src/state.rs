use crate::errors::ErrorCode;
use anchor_lang::prelude::*;
use serde_json::Value;
use solana_program::{program::invoke, system_instruction::transfer};
use std::{cmp::Ordering, slice::Iter, str::FromStr};

pub const GLOBAL_AUTHORITY: &str = "gmdS6fDgVbeCCYwwvTPJRKM9bFbAgSZh6MTDUT2DcgV";
pub const CONFIG_ENTRY_SEED_PREFIX: &str = "config-entry";
pub const CONFIG_ENTRY_SIZE: usize = 8 + std::mem::size_of::<ConfigEntry>() + 16;

#[account]
pub struct ConfigEntry {
    pub bump: u8,
    pub prefix: Vec<u8>,
    pub key: Vec<u8>,
    pub value: String,
    pub extends: Vec<Pubkey>,
}

pub fn assert_authority<'info>(key: &Vec<u8>, value: &String, authority: Pubkey, remaining_accounts: &mut Iter<AccountInfo<'info>>) -> Result<()> {
    if authority == Pubkey::from_str(GLOBAL_AUTHORITY).unwrap() {
        return Ok(());
    }
    if &key[0..2] == "s:".as_bytes() {
        let stake_pool_account_info_unsafe = next_account_info(remaining_accounts);
        if stake_pool_account_info_unsafe.is_err() {
            return Err(error!(ErrorCode::MissingRemainingAccountsForConfigEntry));
        }

        let deserialized_config: &Value = &serde_json::from_str(value).expect("value should be serializable");
        let config_stake_pool_address_unsafe = deserialized_config.get("stakePoolAddress");
        if config_stake_pool_address_unsafe.is_none() {
            return Err(error!(ErrorCode::InvalidPoolAuthority));
        }
        let config_stake_pool_address = config_stake_pool_address_unsafe.unwrap().to_string();

        let stake_pool_account_info = stake_pool_account_info_unsafe.unwrap();
        if stake_pool_account_info.owner == &cardinal_stake_pool::id() {
            let stake_pool_unsafe = Account::<cardinal_stake_pool::state::StakePool>::try_from(stake_pool_account_info);
            if stake_pool_unsafe.is_err() {
                return Err(error!(ErrorCode::InvalidStakePoolAccount));
            }
            let stake_pool = stake_pool_unsafe.unwrap();
            if stake_pool.key().to_string() != config_stake_pool_address {
                return Err(error!(ErrorCode::InvalidConfigPoolAddress));
            }
            if stake_pool.authority != authority.key() {
                return Err(error!(ErrorCode::InvalidPoolAuthority));
            }
        } else if stake_pool_account_info.owner == &cardinal_rewards_center::id() {
            let stake_pool_unsafe = Account::<cardinal_rewards_center::StakePool>::try_from(stake_pool_account_info);
            if stake_pool_unsafe.is_err() {
                return Err(error!(ErrorCode::InvalidStakePoolAccount));
            }
            let stake_pool = stake_pool_unsafe.unwrap();
            if stake_pool.authority != authority.key() {
                return Err(error!(ErrorCode::InvalidPoolAuthority));
            }
            if stake_pool.key().to_string() != config_stake_pool_address {
                return Err(error!(ErrorCode::InvalidConfigPoolAddress));
            }
        }
    }
    Ok(())
}

pub fn resize_account<'info>(account_info: &AccountInfo<'info>, new_space: usize, payer: &AccountInfo<'info>, system_program: &AccountInfo<'info>) -> Result<()> {
    let rent = Rent::get()?;
    msg!("resize {} => {}", account_info.data_len(), new_space);
    let new_minimum_balance = rent.minimum_balance(new_space);
    let current_balance = account_info.lamports();

    match new_minimum_balance.cmp(&current_balance) {
        Ordering::Greater => {
            let lamports_diff = new_minimum_balance.saturating_sub(current_balance);
            invoke(
                &transfer(&payer.key(), &account_info.key(), lamports_diff),
                &[payer.clone(), account_info.clone(), system_program.clone()],
            )?;
        }
        Ordering::Less => {
            let lamports_diff = current_balance.saturating_sub(new_minimum_balance);
            **account_info.try_borrow_mut_lamports()? = new_minimum_balance;
            **payer.try_borrow_mut_lamports()? = payer.lamports().checked_add(lamports_diff).expect("Add error");
        }
        Ordering::Equal => {}
    }
    account_info.realloc(new_space, false)?;
    Ok(())
}
