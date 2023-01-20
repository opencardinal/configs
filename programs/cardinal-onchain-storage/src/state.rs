use crate::errors::ErrorCode;
use anchor_lang::prelude::*;
use std::slice::Iter;

pub const GLOBAL_AUTHORITY: &str = "";
pub const STORAGE_ENTRY_SEED_PREFIX: &str = "storage-entry";
pub const STORAGE_ENTRY_SIZE: usize = 8 + std::mem::size_of::<StorageEntry>() + 16;

#[account]
pub struct StorageEntry {
    pub bump: u8,
    pub key: String,
    pub value: String,
    pub extends: Vec<Pubkey>,
}

pub fn assert_authority<'info>(key: &String, authority: Pubkey, remaining_accounts: &mut Iter<AccountInfo<'info>>) -> Result<()> {
    if key.starts_with("s:") {
        let stake_pool_account_info_unsafe = next_account_info(remaining_accounts);
        if stake_pool_account_info_unsafe.is_err() {
            return Err(error!(ErrorCode::MissingRemainingAccountsForStorageEntry));
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
