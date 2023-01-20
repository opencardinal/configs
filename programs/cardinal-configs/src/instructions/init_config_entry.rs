use {crate::state::*, anchor_lang::prelude::*};

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct InitConfigEntryIx {
    key: String,
    extends: Vec<Pubkey>,
}

#[derive(Accounts)]
#[instruction(ix: InitConfigEntryIx)]
pub struct InitConfigEntryCtx<'info> {
    #[account(
        init,
        payer = authority,
        space = CONFIG_ENTRY_SIZE,
        seeds = [CONFIG_ENTRY_SEED_PREFIX.as_bytes(), ix.key.as_bytes()],
        bump
    )]
    config_entry: Account<'info, ConfigEntry>,

    #[account(mut)]
    authority: Signer<'info>,
    system_program: Program<'info, System>,
}

pub fn handler<'key, 'accounts, 'remaining, 'info>(ctx: Context<'key, 'accounts, 'remaining, 'info, InitConfigEntryCtx<'info>>, ix: InitConfigEntryIx) -> Result<()> {
    assert_authority(&ix.key, ctx.accounts.authority.key(), &mut ctx.remaining_accounts.iter())?;

    let config_entry = &mut ctx.accounts.config_entry;
    config_entry.bump = *ctx.bumps.get("config_entry").unwrap();
    config_entry.key = ix.key;
    config_entry.extends = ix.extends;

    Ok(())
}
