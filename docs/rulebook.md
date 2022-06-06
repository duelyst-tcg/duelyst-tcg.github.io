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

### Artifact

- An artifact is equipped to a general.
- An artifact has 3 durability.
- When the equipped general takes damage, all artifacts equipped to it take 1
  damage.
- An artifact with 0 durability goes into the graveyard.

### Spell

A used spell goes into the graveyard.

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
- can only attack a general/unit within range of 1 tile (horizontal, vertical, diagonal)
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

### Bloodbound Spell

Bloodbound Spells (BBS) costs 1 mana to activate and can only be activated when
it's available.

BBS are available at the start of your 3rd turn. It is available your every
other turn until you reach maximum mana capacity, at which it becomes available
every of your turns (ex: 3, 5, 7, 9, 10, 11, 12, etc).

You may choose to withhold a BBS the turn it's available to use on an "off"
turn (ex: use it on your 4th turn).

### Exhaust

The unit cannot attack nor move until end of turn.

### Rush

The unit can attack and move the same turn it was summoned.

### Flying

The unit can move anywhere on the battlefield.
Being fully surrounded doesn't prevent movement.

### Ranged

The unit can attack anyone on the battlefield.
The defender doesn't strike back if it's not in range of the defender.

### Provoke

Enemy units within the normal range of a friedly unit with this keyword can
only attack the friendly unit with this keyword and cannot move.

## Tribes

### Arcanyst

...

### Battle pet

...

### Dervish

...

### Golem

...

### Mech

...

### Structure

...

### Vespyr

...

### Wall

...
