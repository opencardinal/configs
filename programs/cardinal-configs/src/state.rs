use crate::errors::ErrorCode;
use anchor_lang::prelude::*;
use std::{slice::Iter, str::FromStr};

pub const GLOBAL_AUTHORITY: &str = "gmdS6fDgVbeCCYwwvTPJRKM9bFbAgSZh6MTDUT2DcgV";
pub const CONFIG_ENTRY_SEED_PREFIX: &str = "config-entry";
pub const CONFIG_ENTRY_SIZE: usize = 8 + std::mem::size_of::<ConfigEntry>() + 16;

#[account]
pub struct ConfigEntry {
    pub bump: u8,
    pub key: String,
    pub value: String,
    pub extends: Vec<Pubkey>,
}

pub fn assert_authority<'info>(key: &String, authority: Pubkey, remaining_accounts: &mut Iter<AccountInfo<'info>>) -> Result<()> {
    if authority == Pubkey::from_str(GLOBAL_AUTHORITY).unwrap() {
        return Ok(());
    }
    if key.starts_with("s:") {
        let stake_pool_account_info_unsafe = next_account_info(remaining_accounts);
        if stake_pool_account_info_unsafe.is_err() {
            return Err(error!(ErrorCode::MissingRemainingAccountsForConfigEntry));
        }
        let stake_pool_account_info = stake_pool_account_info_unsafe.unwrap();
        if stake_pool_account_info.owner == &cardinal_stake_pool::id() {
            let stake_pool_unsafe = Account::<cardinal_stake_pool::state::StakePool>::try_from(stake_pool_account_info);
            if stake_pool_unsafe.is_err() {
                return Err(error!(ErrorCode::InvalidStakePoolAccount));
            }
            let stake_pool = stake_pool_unsafe.unwrap();
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
        }
    }
    Ok(())
}
