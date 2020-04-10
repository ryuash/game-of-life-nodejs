/* eslint no-undef: "warn" */
import { expect } from 'chai';
import {
  ICell,
  IAliveCell,
  ICellColor,
} from '../types/gameOfLifeTypes';
import GameOfLife from '../services/gameOfLife';

const neighborA: IAliveCell = {
  value: 1,
  colorR: 2,
  colorB: 200,
  colorG: 32,
};

const neighborB: IAliveCell = {
  value: 1,
  colorR: 12,
  colorB: 23,
  colorG: 32,
};

const neighborC: IAliveCell = {
  value: 1,
  colorR: 12,
  colorB: 23,
  colorG: 32,
};

let gameOfLife: any = null;

describe('gameOfLife tests', () => {
  beforeEach(() => {
    gameOfLife = new GameOfLife();
  });
  describe('newCellColor test', () => {
    it('should return correct average of neighbor\'s colors', () => {
      const neighbors: IAliveCell[] = [
        {
          value: 1,
          colorR: 5,
          colorB: 4,
          colorG: 3,
        },
        {
          value: 1,
          colorR: 2,
          colorB: 3,
          colorG: 1,
        },
      ];

      const newCellColor = gameOfLife.newCellColor(neighbors);
      expect(newCellColor).to.eql({
        colorR: 3,
        colorB: 3,
        colorG: 2,
      });
    });
  });

  describe('getNeighbors test', () => {
    it('should return 0', () => {
      const board: ICell[][] = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];

      gameOfLife.board = board;

      let neighbors = gameOfLife.getNeighbors(0, 0);
      expect(neighbors).to.have.lengthOf(0);

      const boardB: ICell[][] = [
        [0, neighborA, 0],
        [0, neighborB, 0],
        [0, neighborC, 0],
      ];

      gameOfLife.board = boardB;

      neighbors = gameOfLife.getNeighbors(0, 0);
      expect(neighbors).to.have.lengthOf(2);
    });

    it('should return an object with value and alive neighbors', () => {
      const board: ICell[][] = [
        [0, neighborA, 0],
        [0, 0, 0],
        [0, neighborB, 0],
      ];

      gameOfLife.board = board;

      let neighbors = gameOfLife.getNeighbors(1, 0);
      expect(neighbors).to.have.lengthOf(2);

      const boardB: ICell[][] = [
        [0, neighborA, 0],
        [0, neighborB, 0],
        [0, neighborC, 0],
      ];

      gameOfLife.board = boardB;

      neighbors = gameOfLife.getNeighbors(1, 0);
      expect(neighbors).to.have.lengthOf(3);

      neighbors = gameOfLife.getNeighbors(1, 1);
      expect(neighbors).to.have.lengthOf(2);

      neighbors = gameOfLife.getNeighbors(1, 2);
      expect(neighbors).to.have.lengthOf(3);
    });
  });

  describe('generateNextGeneration test', () => {
    it('should correctly return the next generation', () => {
      const board: ICell[][] = [
        [0, neighborA, 0],
        [0, neighborB, 0],
        [0, neighborC, 0],
      ];

      gameOfLife.board = board;

      gameOfLife.generateNextGeneration();

      const nextGenerationNeighborA = {
        value: 1,
        colorR: 8,
        colorB: 82,
        colorG: 32,
      };

      const nextGenerationNeighborB = neighborB;

      const nextGenerationNeighborC = nextGenerationNeighborA;

      const nextGenerationBoard = [
        [0, 0, 0],
        [nextGenerationNeighborA, nextGenerationNeighborB, nextGenerationNeighborC],
        [0, 0, 0],
      ];
      expect(gameOfLife.board).to.eql(nextGenerationBoard);
    });
  });

  describe('updateBoard test', () => {
    it('should return the correct updated board', () => {
      const color: ICellColor = {
        colorR: 3,
        colorB: 20,
        colorG: 21,
      };

      const board: ICell[][] = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];

      let data = [
        {
          col: 0,
          row: 1,
          color,
        },
      ];
      gameOfLife.board = board;
      gameOfLife.updateBoard(data);
      expect(gameOfLife.board[0][1]).to.have.property('colorR').to.eql(3);
      gameOfLife.updateBoard(data);
      expect(gameOfLife.board[0][1]).to.eql(0);

      const newColor = {
        colorR: 13,
        colorB: 30,
        colorG: 21,
      };

      data = [{
        col: 0,
        row: 1,
        color: newColor,
      }];

      gameOfLife.updateBoard(data);
      expect(gameOfLife.board[0][1]).to.have.property('colorR').to.eql(13);
    });
  });
});
