# Rulebook

## Board legend

- `!`: General
- `>`: Player 1 minion
- `<`: Player 2 minion
- `x`: Within range
- `o`: Mana globe

## Card types

### Unit

Units are generals and minions on the field.

#### General

- It is always on the field.
- If it dies, you lose the game.
- It has 3 artifact slots.
- It can equip multiple copies of the same artifact.

#### Minion

- When cast, you summon it onto the battlefield within range of an friendly
  unit.
- It come into play with `Exhaust`.
- When it dies, it goes into the graveyard.
- Some minions are part of a tribe.
  Instead of `Minion` type the tribe is listed.
  See `Tribes` for their specific rules.

### Spell

- A used spell goes into the graveyard.

### Artifact

- An artifact is equipped to a general.
- An artifact has 3 durability.
- When the equipped general takes damage, all artifacts equipped to it take 1
  damage.
- An artifact with 0 durability goes into the graveyard.

## Playing the game

### Win condition

You win the game by killing the opponent's general.

### Board setup

The board is 9x5 tiles.

1. Each player places their general onto the battlefield
    - Player 1: 3,1
    - Player 2: 3,9
2. Place the special tiles onto the battlefield
    - Mana globe: 5,1
    - Mana globe: 5,9
    - Mana globe: 6,3

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

- Begin phase
    1. Gain +1 mana capacity if its below 9
- Main phase
    - Replace a card from your hand
    - Cast your general's bloodbound spell
    - Play artifact/spells/minions
    - Move your units
    - Attack with your units
- End phase
    1. Draw a card

## Movement

A tile occupied by a unit is blocked and cannot be moved to.

A unit:

- can only move once per turn.
- can only move when not fully surrounded.
- can only move before it attacked.
- can per turn move one of the following choices:
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

- can only attack once per turn
- can only attack a general/unit within range of 1 tile (horizontal, vertical,
  diagonal)
- can only attack one target per turn
- looks in a direction:
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

1. the attacker deals damage to the defender for the attacker's attack.
2. if the defender didn't die, it strikes back; dealing damage to the attacker
   for the defender's attack.

## Keywords

These give generals/units additional abilities.
Keywords take predecense over the basic rules.

### Airdrop

The unit can be summoned on any non-occupied tile on the battlefield.

### Backstab: (X)

When attacking from behind the enemy unit, this unit deals an additional X damage AND prevents a counterattack. The additional damage also applies when this unit is counterattacking from behind the enemy unit.

### Blast

When this unit attacks in a cardinal direction, it hits ALL enemy units on the same line. Only nearby or Ranged units will counterattack. Can target non-adjacent minions and generals.

### Bloodbound Spell

Bloodbound Spells (BBS) costs 1 mana to activate and can only be activated when
it's available.

BBS are available at the start of your 3rd turn. It is available your every
other turn until you reach maximum mana capacity, at which it becomes available
every of your turns (ex: 3, 5, 7, 9, 10, 11, 12, etc).

You may choose to withhold a BBS the turn it's available to use on an "off"
turn (ex: use it on your 4th turn).

### Blood Surge

Triggers an effect after you activate your Bloodbound Spell.

### Bond

Triggers an effect when summoned if you have another minion from the same tribe.

### Build

When you summon a minion with the Build keyword, it comes into play as a 0/10 Structure. At the beginning of your turn, your minion's build counter decrements by one: this occurs every turn until the build counter reaches zero. Once the build counter reaches zero, the Structure will transform into the minion you played from your action bar.

### Celerity

This unit can activate twice per turn.

### Deathwatch

When ANY minion dies, trigger the Deathwatch effect.

### Dispel

Abilities and enchantments added to this minion are removed.

### Draw

The ability to draw card(s).

### Dying Wish

When this minion dies, trigger the Dying Wish effect.

### Exhaust

The unit cannot attack nor move until end of turn.

### Flying

The unit can move to any non-occupied tile on the battlefield.
Being fully surrounded doesn't prevent movement.

### Forcefield

Cancel the first damage taken each turn.

### Frenzy

When this unit attacks, it simultaneously hits ALL nearby enemy units. Only the attack target will counterattack.

### Grow: +X/+X

This minion gains +X/+X at the start of your turn.

### Infiltrate

This minion gains a bonus effect when on your opponent's starting side of the battlefield.

### Intensity

Appears on minions and spells granting them a powerful stacking effect.

### Invunerable

Cannot die or be affected by anything.

### Opening gambit

When this minion is summoned from your action bar, trigger the Opening Gambit effect. Opening Gambit effects trigger before the minion enters the battlefield.

### Provoke

Enemy units within the normal range of a friedly unit with this keyword can
only attack the friendly unit with this keyword and cannot move.

### Ranged

The unit can attack anyone on the battlefield.
The defender doesn't strike back if it's not in range of the defender.

### Rebirth

When this minion dies, it leaves behind a 0/1 Egg that hatches into the same minion after one full turn.

### Rush

The unit can attack and move the same turn it was summoned.

### Sentinel

This minion transforms into a stronger minion on a hidden condition.

### Stun

Prevents a minion or General from moving and attacking.

### Summon Dervish

This unit summons a 2/2 Wind Dervish with Rush on a random nearby space at the start of your turn.

### Transform

Change a minion into another minion with different stats and abilities.

### Trial & Destiny

Once the Trial has been satisfied, the card is now unlocked and can be played for its Destiny.

### Wall

This minion cannot move, and is immediately removed from the battlefield if dispelled.

### Zeal

This minion gains a bonus effect when nearby your General.

## Tribes

### Arcanyst

Arcanysts with the Bond keyword will only activate that ability if there is a
friendly Arcanyst on the board when they are summoned.

### Battle pet

Battle Pet is a tribe of minions that cannot be directly controlled

1. If there are enemies within immediate attacking range, a Battle Pet will
   attack the closest one without moving. If there are multiple such enemies,
   it will attack one at random. Enemies on the same row or column as the
   Battle Pet are prioritized over enemies diagonal to it.
2. If there are no enemies within attacking range even after moving, a Battle
   Pet will move towards the closest enemy. If there are multiple enemies that
   share the closest distance, it will move towards one at random.
3. If there are enemies within attacking range but only after moving, a Battle
   Pet will move towards the enemy that requires the least number of tiles to
   reach for the attack. If there are multiple such enemies, it will choose one
   at random. Then as above, it attacks the closest enemy, prioritizing enemies
   on the same row or column. Note that this is different from moving towards
   the closest enemy; two enemies may have different distances but require the
   same number of tiles to reach.
4. A Battle Pet will always take the shortest path towards its target. If there
   are multiple shortest paths, it will choose one at random.
5. A Battle Pet with Ranged moves the same way as if it did not have Ranged (if
   it moves at all), and attacks the closest enemy. This makes its ranged
   effect not very useful as it does not keep its distance.
6. A Battle Pet with Flying behaves as above, except there is almost never a
   case where there are no enemies within attacking range.
7. If a player controls multiple Battle Pets when their turn begins, they act
   in the order they entered the battlefield. If a Battle Pet hatches from an
   Egg or comes into play from a Transform, it is considered to have entered
   the battlefield after Battle Pets that were already there. Nature's
   Confluence places Battle Pets onto the battlefield from left to right,
   bottom to top.

### Dervish

Summoned Wind Dervish tokens are Ephemeral and disappear at the end of your
turn unless buffed by a Dunecaster.

Your Obelysks won’t spawn Dervish tokens if the Obelysk is surrounded.

Ephemeral is a special tag possessed by wind dervishes. It can be removed by a
Dunecaster, but can't otherwise be dispelled. Equally, when a wind dervish that
has been buffed by a dunecaster is dispelled, it does not regain the
ephemeral keyword and does not disappear at the end of the turn.

### Golem

The special abilities of Golems with the Bond keyword only trigger when another
friendly Golem is already on the battlefield.

### Mech

Some mechs have the same Opening Gambit of progressing the
Build for MECHAZ0R!. After playing 5 of these mechs you can summon MECHAZ0R!
for free. After that the building progress gets reset and you can build
towards a new MECHAZ0R!.

The building progress can't be dispelled.

### Structure

Structure minions cannot move or attack and can not increase their attack.

All cards with the build are structures during their build time.

A dispelled structure no longer activates summon minions, but still cannot
attack or move, and continues to occupy its terrain space until it is
destroyed. 

Structures cannot gain attack boosts, except through Stone to Spears.

### Vespyr

Vespyr tokens will also activate Vespyr effects.
