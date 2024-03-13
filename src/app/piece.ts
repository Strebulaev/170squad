export enum PieceType {
  Pawn = 'Pawn',
  Rook = 'Rook',
  Knight = 'Knight',
  Bishop = 'Bishop',
  Queen = 'Queen',
  King = 'King',
}

export enum Color {
  Black = 'black',
  White = 'white',
}

export class Piece {
  type: PieceType;
  name: string;
  color: Color;
  imageUrl: string;
  possibleMoves: [number, number][];

  row: number = 1;
  col: number = 1;

  constructor(type: PieceType, color: Color) {
    this.type = type;
    this.name = type.toString().toLowerCase(); // Assign the lowercase string representation of the PieceType enum value
    this.color = color;

    const prefix = this.color === Color.White ? 'w-' : 'b-';
    this.imageUrl = `/assets/images/${prefix}${this.name}.png`; // Surround the URL with backticks to form a string

    this.possibleMoves = [];
  }
}
