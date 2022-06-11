# Rulebook

## Board legend

- `!`: General
- `>`: Player 1 minion
- `<`: Player 2 minion
- `x`: Within range
- `o`: Mana Tile

## Card types

### Unit

These are on the battlefield.

#### General

A General is a representation of you and always on the field. You lose the game
when it's health reaches 0. A General always has a BloodBound Spell (see
Keywords for more info).

#### Minion

A Minion is an unit that help you kill your enemy General.

When cast, you summon it onto the battlefield within range of an friendly unit.
It come into play with `Exhaust`. It dies when it's health reaches 0. When it
dies, it goes into the graveyard. 

Some minions are part of a tribe. Instead of `Minion` type, the tribe is
listed. See `Tribes` for their specific rules.

### Spell

A spell contains effects to give you resources or put pressure on your enemy.
A used spell goes into the graveyard.

### Artifact

An Artifact increases your General's capabilities.

A General has 3 Artifact slots, and can equip multiple of the same Artifact.

An Artifact is equipped to a General and has 3 durability. When the equipped
General takes damage from any source, all artifacts equipped to it remove 1
durability. An artifact with 0 durability is sent to the graveyard immediately.

## Playing the game

### Win condition

You win the game by killing the opponent's general.

### Board setup

The board is 9x5 tiles.

1. Each player places their general onto the battlefield
    - Player 1: 3,1
    - Player 2: 3,9
2. Place the special tiles onto the battlefield
    - Mana Tile: 5,1
    - Mana Tile: 5,9
    - Mana Tile: 6,3

The board should look like this:

```txt
....o....
.........
!....o..!
.........
....o....
```

### The beginning of the game

1. Each player draws 5 cards
2. Each player may take a mulligan

### Player's turn overview

A player's turn takes up to 90 seconds. When the time is up, the player
automatically goes to the end phase.

- Begin phase
    1. Gain +1 mana capacity if its below 9
    2. Activate all friendly units
- Main phase
    - Replace a card from your hand
    - Cast your general's bloodbound spell
    - Play artifact/spells/minions
    - Move your units
    - Attack with your units
- End phase
    1. Exhaust all friendly units
    2. Draw a card

## Replace

You can set a card from your Action Bar aside face down to draw another card
from your deck. Is it the same card? Put that aside too and draw another.
Repeat this until you no longer draw the same card. Then shuffle all cards put
aside into the deck.

## Mulligan

You select any number of cards from your Action Bar and replace them. A
mulligan doesn't count as a replace, so Player 1 can still Replace a card in
his/her turn.

## Movement

A tile occupied by a unit is blocked and cannot be moved to.

A unit:

- Can only move once per turn.
- Can only move when not fully surrounded.
- Can only move before it attacked.
- Can per turn move one of the following choices:
    - up to 2 tiles horizontal or vertical.
    - 1 tile diagonal.

Movement range:

```txt
....x....
...xxx...
..xx>xx..
...xxx...
....x....
```

## Combat

An unit:

- Can only attack once per turn
- Can only attack a general/unit within range of 1 tile (horizontal, vertical,
  diagonal)
- Can only attack one target per turn
- Looks in a direction:
  - Player 1: left (`>`)
  - Player 2: right (`<`)

Unit attack range:

```txt
.........
...xxx...
...x>x...
...xxx...
.........
```

Resolving combat:

1. The attacker deals damage to the defender for the attacker's attack.
2. If the defender didn't die, it strikes back; dealing damage to the attacker
   for the defender's attack.

## Statusses

### Activated

Unit is allowed to move and attack.

### Exhausted

Unit receives this when it has done all actions it could.
The unit cannot attack nor move until the beginning of your next turn.

## Keywords

### Airdrop

The unit can be summoned on any non-occupied tile on the battlefield.

### Backstab: (X)

When Attacking from the square directly behind the target, you deal extra
damage and will not receive counterattacks. If a minion has 0 attack they can't
attack or counter-attack even though backstab would increase the attack above
0.

### Blast

Attack all enemy minions and Generals in one straight line. If a Blast unit
attacks a nearby enemy diagonally, it will not attack any other units in that
diagonal. The damage hits all targets equally. No damage is lost as the attack
pierces multiple targets. This means that the effects of cards like Falcius and
Psionic Strike can apply to multiple enemies. Only nearby or Ranged units will
counterattack. Can target non-adjacent minions and generals.

### Bloodbound Spell

Bloodbound Spells (BBS) costs 1 mana to activate and can only be activated when
it's available.

BBS are available at the start of your 3rd turn. It is available your every
other turn until you reach maximum mana capacity, at which it becomes available
every of your turns (ex: 3, 5, 7, 9, 10, 11, 12, etc).

You may choose to withhold a BBS the turn it's available to use on an "off"
turn (ex: use it on your 4th turn).

### Blood Surge

Triggers an effect after you activate your Bloodbound Spell. Blood Surge
effects happen after the BBS' effect is resolved. 

### Bond

Triggers a special effect when this unit is put into play whilst at least one
other minion from the same tribe at that unit is on the board. It doesn't need
to be played from the action bar to occur.

### Build

When you summon a minion with the Build keyword, it comes into play as a 0/10
Structure token. At the beginning of your turn, your minion's build counter
decrements by one until the build counter reaches zero. When it reaches zero,
the Structure will transform into the minion you played from your action bar.

A card with Build i a Structures during it's build time.

If a Build Structure is returned to the action bar, the owner will receive a
copy of the 0/10 Build Structure and loses build progrssion. Buildings will
match the original minion's Mana Cost. The Structure will build into the
original minion.

Anything that is applied to a Build minion while the card is in your action bar
will apply to the transformed minion once done Building.

### Celerity

This unit can activate twice per turn before becoming exhausted.

### Deathwatch

When ANY minion dies, trigger the Deathwatch effect.

### Dispel

Abilities, tiles and enchantments added to this minion or the battlefield are
removed.

Dispels applied in combat will apply before strike back if you are the
attacker.

Any damage sustained to an enchanted Minion will remain after being Dispelled.
This means if a Minion takes more than its original max health in damage, it
will die immediately after losing its bonus Health.

- Walls will disappear immediately when Dispelled.
- Wind Dervishes will disappear immediately when Dispelled, unless a Dunecaster
  has erased their disappear effect.
- Stun will be removed.
- Mana Tiles will disappear.
- Dispelling Rush on your own minion will exhaust that minion.
- Dispelling Eggs will prevent them from hatching.
- Flying units that are dispelled lose flying, but can still move normally.
- Summon Dervish units will no longer summon Wind Dervish tokens.

You cannot dispel:

- Artifacts
- The following effects:
    - Bond
    - Build progression
    - Destiny
    - MECHAZ0R! building progress
    - That become original stats
    - Transformation
- Watchful Sentinels

### Draw

The ability to draw card(s). "Add to your action bar" without mentioning Draw
means you don't get the card from your deck, but from thin air. If you draw
more cards than the maximum hand size (6), the card gets discarded immediately.

### Dying Wish

When this minion dies, trigger the Dying Wish effect.

Cards with Dying Wish: Summon X on this space will not trigger if something
spawns in the same square before Dying Wish triggers.

This is based on who initiates the action; the initiator’s effect takes
priority.

### Flying

The unit can move to any non-occupied tile on the battlefield.
Being fully surrounded doesn't prevent movement.

### Forcefield

Cancel the first damage taken each turn. Even if a spell deals 0 damage, it
still breaks the Forcefield.

### Frenzy

When this unit attacks, it simultaneously hits ALL nearby enemy units. Only the
attack target will counterattack. Counterattacks from enemies with Frenzy won’t
strike any other targets besides the Attacker.

### Grow: +X/+X

This minion gains +X/+X at the start of your turn.

### Heal

Restore the unit's health. You cannot heal past the minion's maximum total
health.

### Infiltrate

This minion gains a bonus effect when on your opponent's starting side of the
battlefield. your Infiltrate bonus applies to the first four columns from your
opponent's starting side. A minion loses its Infiltrate bonus as soon as it
leaves your opponent's starting side of the battlefield.

```txt
1: Player 1's starting side of the field
2: Player 2's starting side of the field

1111.2222
1111.2222
1111.2222
1111.2222
1111.2222
```

### Intensity

Intensify is triggered whenver the minion is put into play in any way. The
effect increases each time the minion is put in play.

The formula is `x * n` 

- `x` = digits printed on card
- `n` = numbers of times the card was played

Only the minion put into play with Intensify gets the bonus, not those already
on the battlefield.

### Invunerable

Cannot die or be affected by anything.

### Opening gambit

This Minion triggers an effect immediately before being summoned from the
Action Bar. The effect also happens if the minion instantly dies when
summoned. It will not trigger when the minion wasn't summoned from the
Action Bar. 

### Provoke

Nearby enemies can select only this minion as an attack target and cannot
move. If your enemy is Provoked by multiple minions at once, they can choose
any Provoke minion to target.

### Ranged

The unit can attack anyone on the battlefield. The defender doesn't strike back
if it's not in range of the defender. Ranged is counterattacked by other Ranged,
but not by Blast.

### Reactivate

Remove exaust from minion.

### Rebirth

When this minion dies, it leaves behind a 0/1 Egg that hatches into the same
minion after one full turn.

### Rush

The unit does not become exausted when summoned.

### Sentinel

When you first play your Sentinel minion it will appear on board as a Watchful
Sentinel token. When your opponent triggers the Sentinel minion's listed
condition in his/her turn, it transforms into the minion you played.

If a destoy effect targeting a Watchful Sentinel directly, it dies. If it
doesn't target, it does nothing against the Watchful Sentinel. Stats
increases and decreases are applied after transformation.

Transformations won't trigger Sentinels. This includes cases such as a Build
minion finishing building, or an Egg hatching.

### Stun

Prevents a unit from moving and attacking until the caster's next turn. Stunned
units cannot be reactivated. Stunned units can strike back.

### Summon Dervish

This unit summons a 2/2 Wind Dervish with Rush on a random nearby space at the
start of your turn. No Wind Dervish will be summoned if the surrounding space
is fully occupied.

### Transform

Change a minion into another minion with different stats and abilities. Stun is
removed upon transformation. Transformations don't trigger Dying Wish or
Deathwatch. Both Bond and Intensify effects can occur after a Transform.

### Trial & Destiny

You can have only one Trial & Destiny card in your deck.

At the start of your match, your Trial and Destiny card will be removed from
your deck. It will be added to your Action Bar after the mulligan phase. This
will be the sixth card in your Action Bar.

It is locked (cannot be played or replaced) until the Trial condition of the
card has been satisfied. When satisfied, the card remains unlocked even if the
condition is no longer satisfied afterwards.

The Destiny effect only triggers when it's played from the Action Bar and can
only be triggered once pergame. The effect is permanent and cannot be removed
nor dispelled.

### Wall

This minion cannot move.

### Zeal

This minion gains a bonus effect when nearby your General.

## Tribes

### Battle pet

Battle Pet is a tribe of minions that cannot be directly controlled.

#### Movement and attack rules

1. The minion always chooses shortest the path to a target.
    - If there are multiple shortest paths, it will choose one at random.
    - If there are multiple targets, the minion prioritizes the target on the
      same row or column over targets diagonal to it.
    - If the distance is equal between the closest targets, it chooses one at
      random.
2. If there are enemies within immediate attacking range, the minion will
   attack the closest one without moving.
3. If there are enemies within attacking range but only after moving, the
   minion will move towards the enemy that requires the least number of tiles
   to reach for the attack.
4. If there are no enemies in attack range even if it would move, the minion
   moves towards the closest enemy.
5. If a player controls multiple Battle Pets when their turn begins, they act
   in the order they entered the battlefield.

#### Special cases

- A Battle Pet with Ranged and/or Flying moves the same way as if it did not
  have these keywords, and attacks the closest enemy.
- If a Battle Pet hatches from an Egg or comes into play from a Transform, it
  is considered to have entered the battlefield after Battle Pets that were
  already there.

### Mech

Some mechs have the same Opening Gambit of progressing the Build for
MECHAZ0R!. When the building progress reaches 100%, you can summon MECHAZ0R!
for free. After that the building progress gets reset and you can build towards
a new MECHAZ0R!.

### Structure

Structure minions cannot move or attack and can not increase their attack. A
Structure cannot gain attack boosts unless explicitly specified by the card.

### Vespyr

Vespyr tokens will also activate Vespyr effects.
