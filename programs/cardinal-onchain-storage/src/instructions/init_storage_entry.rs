use {crate::state::*, anchor_lang::prelude::*};

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct InitStorageEntryIx {
    name: String,
    extends: Vec<Pubkey>,
}

#[derive(Accounts)]
#[instruction(ix: InitStorageEntryIx)]
pub struct InitStorageEntryCtx<'info> {
    #[account(
        init,
        payer = authority,
        space = STORAGE_ENTRY_SIZE,
        seeds = [STORAGE_ENTRY_SEED_PREFIX.as_bytes(), ix.name.as_bytes()],
        bump
    )]
    storage_entry: Account<'info, StorageEntry>,

    #[account(mut)]
    authority: Signer<'info>,
    system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<InitStorageEntryCtx>, ix: InitStorageEntryIx) -> Result<()> {
    let storage_entry = &mut ctx.accounts.storage_entry;
    storage_entry.bump = *ctx.bumps.get("storage_entry").unwrap();
    storage_entry.name = ix.name;
    storage_entry.authority = ctx.accounts.authority.key();
    storage_entry.extends = ix.extends;

    Ok(())
}
