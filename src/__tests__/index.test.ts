describe('test for cli / index.ts', () => {
  describe('US_1 : after starting the program, the empty grid should be printed', () => {
    test('"Round start" should be printed', () => {
      expect(true).toBe(true)
    })

    test('the grid should have empty 3 x 3 cells', () => {
      expect(true).toBe(true)
    })

    test('"X: Please enter the position of your mark (Row:Column):" should be printed', () => {
      expect(true).toBe(true)
    })
  })

  describe('US_2 : a player can enter the position of a mark', () => {
    test('input should be row:column', () => {
      expect(true).toBe(true)
    })

    test('Error message should be printed by a wrong input', () => {
      expect(true).toBe(true)
    })

    describe('after entering a position, the grid with mark should be printed', () => {
      test('the mark should be correct', () => {
        expect(true).toBe(true)
      })

      test('the position of the mark should be correct', () => {
        expect(true).toBe(true)
      })
    })
  })

  describe('US_3 : play rounds', () => {
    describe('rounds should be played alternately', () => {
      test('X should take the first turn of the first round', () => {
        expect(true).toBe(true)
      })
      test('X should take first turn after draw', () => {
        expect(true).toBe(true)
      })

      describe('the looser should take first turn of the next round', () => {
        test('X should take the first turn of the round', () => {
          expect(true).toBe(true)
        })
        test('O should take the first turn of the round', () => {
          expect(true).toBe(true)
        })
      })
    })

    describe('turns should be played alternately in a round', () => {
      test('X should take the turn of the round', () => {
        expect(true).toBe(true)
      })
      test('O should take the turn of the round', () => {
        expect(true).toBe(true)
      })
    })

    describe('after each positioning a mark, winner (or draw) should be detected', () => {
      describe('if there is no winner or its not draw, round should be continue', () => {
        test('the result message (winner X) should be printed', () => {
          expect(true).toBe(true)
        })
      })
      describe('if a player won, the result message should be printed', () => {
        test('the result message (winner X) should be printed', () => {
          expect(true).toBe(true)
        })
        test('the result message (winner O) should be printed', () => {
          expect(true).toBe(true)
        })
      })
      describe('if its draw, the result message should be printed', () => {
        test('the result message (draw) should be printed', () => {
          expect(true).toBe(true)
        })
      })
      describe('restart message should be printed by result', () => {
        test('result with winner', () => {
          expect(true).toBe(true)
        })
        test('result with draw', () => {
          expect(true).toBe(true)
        })
      })

      describe('player can start next round after result', () => {
        test('next round should start after pressing enter in result view with winner', () => {
          expect(true).toBe(true)
        })
        test('next round should start after pressing enter in result view with draw', () => {
          expect(true).toBe(true)
        })
      })
    })
  })

  describe('US_4 : check the stats', () => {
    describe('stats should be printed by pressing "p"', () => {
      test('should be printed by typing a position of a mark', () => {
        expect(true).toBe(true)
      })

      test('should be printed after a result of a round', () => {
        expect(true).toBe(true)
      })

      test('should be printed after starting the program', () => {
        expect(true).toBe(true)
      })

      describe('stats should be correct', () => {
        test('stats should be X:0, O:0', () => {
          expect(true).toBe(true)
        })
        test('stats should be X:1, O:0', () => {
          expect(true).toBe(true)
        })
        test('stats should be X:2, O:0', () => {
          expect(true).toBe(true)
        })
        test('stats should be X:0, O:1', () => {
          expect(true).toBe(true)
        })
        test('stats should be X:0, O:2', () => {
          expect(true).toBe(true)
        })
      })

      describe('player can back to the round by pressing "enter"', () => {
        test('back to the result', () => {
          expect(true).toBe(true)
        })
        test('back to the turn', () => {
          expect(true).toBe(true)
        })
      })
    })
  })

  describe('US_5 : end the game', () => {
    describe('the program should be terminated by pressing "e"', () => {
      describe('should be terminated by inserting a position of a mark', () => {
        test('should be terminated before typing a position', () => {
          expect(true).toBe(true)
        })
        test('should be terminated while typing a position', () => {
          expect(true).toBe(true)
        })
      })
      test('could be terminated after printing stats', () => {
        expect(true).toBe(true)
      })
      test('could be terminated after a result of a round', () => {
        expect(true).toBe(true)
      })
    })
  })
})
