# ♟️ Movement & Capture Logic

This folder contains all the **piece-specific movement and capture rules** for the chess engine.  
Every piece has its own file, and **all movement logic is implemented manually** by me — without using external chess libraries.

Each function inside this folder is responsible for generating:

- **Valid movement squares**
- **Valid capture squares**
- **Pin-aware restrictions**
- **King-safety compliant moves**
- **Move highlighting (UI integration)**

These scripts work together with `script.js` to fully control piece behavior.

---

## 📂 Files Overview

### **1. Pawn.js**
Handles:
- Single & double forward moves  
- Diagonal captures  
- Rule-based movement depending on pawn color  
- **Pin restrictions** (vertical, diagonal, and special pawn-diagonal pins)  
- En passant support will be added later  

This is one of the most complex movement files due to special pawn rules.

---

### **2. Knight.js**
Implements:
- All 8 L-shaped knight jumps  
- Board boundary checks  
- Enemy detection for captures  
- **Pin detection** → if the knight is pinned, it cannot move  

The knight is the only piece that can jump over others, and the logic fully supports this.

---

### **3. Bishop.js**
Handles diagonal movement using **ray-casting**:
- Moves until a piece blocks the path  
- Adds capture only on the first enemy piece found  
- Stops on friendly piece  
- Supports both left and right diagonal directions  

Used also by the queen logic.

---

### **4. Rook.js**
Implements straight-line rook sliding:
- Up, Down, Left, Right ray-casting  
- Stops at first blockage  
- Recording captures and moves separately  
- Forms the core for queen movement  

---

### **5. Queen.js**
A combination of:
- Bishop logic  
- Rook logic  

The queen simply merges movement & capture arrays from both systems.

---

### **6. King.js**
Controls king movement:
- One-square movement in eight directions  
- **Full safety checking** before moving  
  - Pawn attacks  
  - Knight attacks  
  - Bishop / rook / queen sliding attacks  
  - Adjacent enemy king squares  
- Prevents illegal king moves  
- Used as part of detecting check conditions  

Later this file will also include **castling logic**.

---

## ⚙️ How These Files Work Together

When a player selects a piece:

1. The board calls the matching movement file  
2. The file returns:
   - Valid movement squares  
   - Valid capture squares  
3. Pins and king-safety rules restrict illegal moves  
4. UI highlights:
   - Blue for movement  
   - Red for captures  
5. `script.js` handles:
   - Applying the move  
   - Updating board state  
   - Switching turns  

This system mimics real chess engine behavior, but is fully custom-built.

---

## 🔧 Future Enhancements Planned

- **Castling logic (King + Rook cooperation)**  
- **En passant rules**  
- **Promotion handling**  
- **Check, Checkmate, Stalemate move filtering**  
- **Move legality wrapper around all piece logic**  

---

## 🎯 Purpose of This Design

The goal is to create a chess engine where:
- Every rule is **explicitly implemented**
- Movement logic is **modular** and easy to maintain
- The UI and engine are cleanly separated
- Special rules can be added without rewriting core logic

This folder represents the foundation of the custom chess rule engine.
