use {crate::state::*, anchor_lang::prelude::*};

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct UpdateConfigEntryIx {
    value: String,
    extends: Vec<Pubkey>,
}

#[derive(Accounts)]
#[instruction(ix: UpdateConfigEntryIx)]
pub struct UpdateConfigEntryCtx<'info> {
    config_entry: Account<'info, ConfigEntry>,

    #[account(mut)]
    authority: Signer<'info>,
}

pub fn handler(ctx: Context<UpdateConfigEntryCtx>, ix: UpdateConfigEntryIx) -> Result<()> {
    assert_authority(&ctx.accounts.config_entry.key, ctx.accounts.authority.key(), &mut ctx.remaining_accounts.iter())?;

    let config_entry = &mut ctx.accounts.config_entry;
    config_entry.value = ix.value;
    config_entry.extends = ix.extends;

    Ok(())
}
