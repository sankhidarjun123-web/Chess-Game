# ♟️ I Coded Chess — A Fully Custom Chess Engine + UI (Built From Scratch)

This is my personal project where I am building **a complete chess game from the ground up** —  
including **all piece movement logic, rule enforcement, pins, king safety, captures, UI rendering**,  
and eventually **multiplayer with Socket.io**.

I am **not using Chess.js, Chessboard.js, or any external chess logic libraries**.  
Every rule, move generator, and mechanic has been **hand-coded by me**, step by step.

This project is still in active development, and I’m continuously improving it.

---

## 🚀 Current Features

### ✔️ **Full Chessboard UI**
- Programmatic 8×8 grid generation  
- Automatic piece placement based on an internal board matrix  
- Square coloring, outlines, and highlights  
- Captured pieces display  
- Turn indication & state updates  

### ✔️ **Complete Movement Logic (My Own Implementation)**
Each piece has its own dedicated move generator file:

- **Pawn.js** — forward moves, diagonal captures, pin-aware restrictions  
- **Knight.js** — all L-shaped moves, blocked if pinned  
- **Bishop.js** — diagonal sliding with ray-casting  
- **Rook.js** — horizontal + vertical sliding  
- **Queen.js** — combined bishop + rook logic  
- **King.js** — one-step moves, safety checks, illegal squares prevented  

### ✔️ **Advanced Pin Detection**
I implemented my own pin engine that:
- Scans all 8 directions from every piece  
- Detects vertical, horizontal, left-diagonal, right-diagonal pins  
- Handles **pawn diagonal pin restrictions**  
- Prevents illegal moves *before* generating moves  

This is a feature even many open-source chess engines skip.

### ✔️ **King Safety Enforcement**
The king can only move to squares that are not attacked.  
I manually check:
- Pawn attack patterns  
- Knight attack zones  
- Sliding attacks from rooks, bishops, queens  
- Adjacent enemy king squares  

This ensures **no illegal king move is ever shown**.

### ✔️ **Move + Capture Highlight System**
- Blue = legal move  
- Red = legal capture  
- Clear selection & reset on re-click  

### ✔️ **Stateful Board Logic**
- Tracks board as a 2D matrix  
- Updates both UI and internal state consistently  
- Tracks captured white and black pieces  

---

## 🛠️ Features in Progress

I am currently working on implementing:

### 🔸 Check and Checkmate  
### 🔸 Stalemate detection  
### 🔸 Castling (king + rook logic)  
### 🔸 En Passant  
### 🔸 Pawn Promotion  
### 🔸 Move Legality Wrapper (full engine-style move validation)  

---

## 📅 Upcoming Major Additions

### 🎮 Drag & Drop + Touch Controls
Support for:
- Mouse drag
- Mobile touch drag
- iOS + Android pointer events
- Smooth piece animation

### 📱 Responsive Mobile UI
Media queries to make the board fully usable on small screens.

### 🔊 Sound Effects + Animations
- Move sound  
- Capture sound  
- Check alert  
- Smooth sliding piece animations  

### 🔁 Board Rotation
Rotate board depending on whose turn it is.

### 🌐 Online Multiplayer (Socket.io)
I plan to add:
- Matchmaking rooms  
- Real-time move syncing  
- Server-side validation of moves  
- Anti-cheat logic  
- Game reconnection support  

---

## 📂 Project Structure

/Rules
Pin.js
/Pieces (MovementAndCapture)
Pawn.js
Knight.js
Bishop.js
Rook.js
Queen.js
King.js
script.js → Main engine + UI binding
index.html → Layout
style.css → UI styling
