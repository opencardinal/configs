pub mod errors;
pub mod instructions;
pub mod state;

use {anchor_lang::prelude::*, instructions::*};

declare_id!("cnf9Q2MmjDVbzX1kjr8tEEtPJyB4e1avEuBMzWygnWo");

#[program]
pub mod cardinal_configs {
    use super::*;

    pub fn init_config_entry<'key, 'accounts, 'remaining, 'info>(ctx: Context<'key, 'accounts, 'remaining, 'info, InitConfigEntryCtx<'info>>, ix: InitConfigEntryIx) -> Result<()> {
        init_config_entry::handler(ctx, ix)
    }

    pub fn update_config_entry(ctx: Context<UpdateConfigEntryCtx>, ix: UpdateConfigEntryIx) -> Result<()> {
        update_config_entry::handler(ctx, ix)
    }
}
