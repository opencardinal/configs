use anchor_lang::prelude::*;

pub const STORAGE_ENTRY_SEED_PREFIX: &str = "storage-entry";
pub const STORAGE_ENTRY_SIZE: usize = 8 + std::mem::size_of::<StorageEntry>() + 16;

#[account]
pub struct StorageEntry {
    pub bump: u8,
    pub name: String,
    pub value: String,
    pub authority: Pubkey,
    pub extends: Vec<Pubkey>,
}
