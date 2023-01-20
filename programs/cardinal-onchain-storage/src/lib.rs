pub mod errors;
pub mod instructions;
pub mod state;

use {anchor_lang::prelude::*, instructions::*};

declare_id!("cosTRGbPdRwuyAnWXQ8H7rNXZNXvsQ3nbvzGd9BdvoT");

#[program]
pub mod cardinal_onchain_storage {
    use super::*;

    pub fn init_storage_entry<'key, 'accounts, 'remaining, 'info>(ctx: Context<'key, 'accounts, 'remaining, 'info, InitStorageEntryCtx<'info>>, ix: InitStorageEntryIx) -> Result<()> {
        init_storage_entry::handler(ctx, ix)
    }

    pub fn update_storage_entry(ctx: Context<UpdateStorageEntryCtx>, ix: UpdateStorageEntryIx) -> Result<()> {
        update_storage_entry::handler(ctx, ix)
    }
}
