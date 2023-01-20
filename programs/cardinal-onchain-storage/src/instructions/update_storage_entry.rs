use {crate::state::*, anchor_lang::prelude::*};

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct UpdateStorageEntryIx {
    value: String,
    extends: Vec<Pubkey>,
}

#[derive(Accounts)]
#[instruction(ix: UpdateStorageEntryIx)]
pub struct UpdateStorageEntryCtx<'info> {
    // #[account(mut, constraint = storage_entry.authority == authority.key() @ ErrorCode::InvalidAuthority)]
    storage_entry: Account<'info, StorageEntry>,

    #[account(mut)]
    authority: Signer<'info>,
}

pub fn handler(ctx: Context<UpdateStorageEntryCtx>, ix: UpdateStorageEntryIx) -> Result<()> {
    assert_authority(&ctx.accounts.storage_entry.key, ctx.accounts.authority.key(), &mut ctx.remaining_accounts.iter())?;

    let storage_entry = &mut ctx.accounts.storage_entry;
    storage_entry.value = ix.value;
    storage_entry.extends = ix.extends;

    Ok(())
}
