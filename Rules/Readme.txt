# ♟️ Chess Rules Engine (Pin & King Safety Logic)

The `Rules/` folder contains the **core rule-enforcement logic** that ensures the game follows real chess laws.  
While the `MovementAndCapture/` folder generates movement patterns for each piece,  
the **Rules** folder is responsible for *restricting* those moves based on tactical conditions like:

- Pins  
- King safety  
- Illegal movement squares  
- Directional attack detection  

This folder is the foundation of the **chess legality engine**.

---

## 📂 Files Overview

### **1. Pin.js**
This module determines whether a piece is **pinned** to its king and therefore restricted in its movement.

#### ✔ Features implemented:
- **Vertical pin detection**  
- **Horizontal pin detection**  
- **Diagonal pin detection** (both directions)  
- **Identification of attacker direction**  
- **Pawn-specific pin logic**  
  - Detects *which* diagonal capture is legal when pinned  
  - Eliminates illegal pawn captures if the pawn is pinned  

#### 🔍 How it works:
- It scans outward from the piece along all 8 directions.
- It looks for:
  1. **Your king** on one side  
  2. **An enemy rook/bishop/queen** on the opposite side  
- If both exist → the piece is pinned in that direction.
- Returns a structured object:

```js
{
  isPin: true/false,
  vertical: true/false,
  horizontal: true/false,
  leftDiagonal: true/false,
  rightDiagonal: true/false,
  pawnDiagonal: [dr, dc] or null
}
