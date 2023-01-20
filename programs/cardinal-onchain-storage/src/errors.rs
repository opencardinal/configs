use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Invalid authority")]
    InvalidAuthority,
    #[msg("Missing remaining accounts for storage entry")]
    MissingRemainingAccountsForStorageEntry,
    #[msg("Invalid stake pool account")]
    InvalidStakePoolAccount,
    #[msg("Invalid reward center pool account")]
    InvalidRewardCenterPoolAccount,
    #[msg("Invalid pool authority")]
    InvalidPoolAuthority,
}
