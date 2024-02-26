import { Component } from '@angular/core';

@Component({
  selector: 'app-dndchess',
  templateUrl: './dndchess.component.html',
  styleUrls: ['./dndchess.component.css']
})
export class DndchessComponent {
  chessBoard: ChessCell[] = [];
  selectedCell: ChessCell | null = null;

  constructor() {
    this.initializeChessBoard();
  }

  initializeChessBoard() {
    const startingPosition = [
      '♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖',
      '♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟',
      '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '',
      '♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙',
      '♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'
    ];

    for (let i = 0; i < 64; i++) {
      const row = Math.floor(i / 8);
      const col = i % 8;
      const color = (row + col) % 2 === 0 ? 'black' : '#FF7F00';

      this.chessBoard.push({ piece: startingPosition[i], position: i, color: color });
    }
  }

  getChessPieceClass(cell: ChessCell): string {
    return `piece-${cell.piece.toLowerCase()}`;
  }

  selectCell(cell: ChessCell) {
    if (cell.piece !== '') {
      this.selectedCell = cell;
    } else if (this.selectedCell) {
      this.movePiece(this.selectedCell, cell);
    }
  }

  movePiece(sourceCell: ChessCell, targetCell: ChessCell) {
    const movedPiece = this.chessBoard[sourceCell.position].piece;
    this.chessBoard[sourceCell.position].piece = '';
    this.chessBoard[targetCell.position].piece = movedPiece;
    this.selectedCell = null;
  }

  startDrag(event: DragEvent, cell: ChessCell) {
    if (cell.piece !== '') {
      this.selectedCell = cell;
      event.dataTransfer!.setData('text/plain', '');
    }
  }

  dragOver(event: DragEvent) {
    event.preventDefault();
  }

  drop(event: DragEvent, targetCell: ChessCell) {
    event.preventDefault();
    if (this.selectedCell) {
      this.movePiece(this.selectedCell, targetCell);
    }
  }
}

interface ChessCell {
  piece: string;
  position: number;
  color: string;
}
