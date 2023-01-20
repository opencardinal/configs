use {crate::state::*, anchor_lang::prelude::*};

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct InitStorageEntryIx {
    key: String,
    extends: Vec<Pubkey>,
}

#[derive(Accounts)]
#[instruction(ix: InitStorageEntryIx)]
pub struct InitStorageEntryCtx<'info> {
    #[account(
        init,
        payer = authority,
        space = STORAGE_ENTRY_SIZE,
        seeds = [STORAGE_ENTRY_SEED_PREFIX.as_bytes(), ix.key.as_bytes()],
        bump
    )]
    storage_entry: Account<'info, StorageEntry>,

    #[account(mut)]
    authority: Signer<'info>,
    system_program: Program<'info, System>,
}

pub fn handler<'key, 'accounts, 'remaining, 'info>(ctx: Context<'key, 'accounts, 'remaining, 'info, InitStorageEntryCtx<'info>>, ix: InitStorageEntryIx) -> Result<()> {
    assert_authority(&ix.key, ctx.accounts.authority.key(), &mut ctx.remaining_accounts.iter())?;

    let storage_entry = &mut ctx.accounts.storage_entry;
    storage_entry.bump = *ctx.bumps.get("storage_entry").unwrap();
    storage_entry.key = ix.key;
    storage_entry.extends = ix.extends;

    Ok(())
}
