### Puzzle Race

## events
- start game
  - hide start button
  - mix target
  - start timer
  - unlock board tiles
  - show solved button

- click tile
  - filter empty space is adjacent
    - find tiles between clicked and empty - move tiles one step towards empty

- click solved button
  - filter matched with target
    - stop timer
    - declare winner
    - block board tiles
    - show start button
  - else
    - flash wrong
