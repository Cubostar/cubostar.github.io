const shattersRedTowerSrc = "../images/shatters-red-tower.png";
const shattersGreenTowerSrc = "../images/shatters-green-tower.png";
const shattersLockedTowerSrc = "../images/shatters-locked-tower.png";

const puzzleGameModel = {
	board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
	editModeActive: false,
	initialize() {
		this.board.forEach((row, index, array) => {
			array[index] = row.map(() => {
				return Math.round(Math.random());
			});
		});
		this.editModeActive = false;
	},
	updateCell(row, col) {
		if (row < 0 || row > 2 || col < 0 || col > 2) {
			return;
		} else if (this.board[row][col] == 0) {
			this.board[row][col] = 1;
		} else if (this.board[row][col] == 1){
			this.board[row][col] = 0;
		}
	},
	updateBoard(row, col) {
		this.updateCell(row, col);
		if (!this.editModeActive) {
			this.updateCell(row - 1, col);
			this.updateCell(row + 1, col);
			this.updateCell(row, col - 1);
			this.updateCell(row, col + 1);
		}
		if (this.isWon()) {
			this.endGame();
		}
	},
	isWon() {
		return !this.editModeActive && !this.board.flat().includes(0) && !this.board.flat().includes(2);
	},
	endGame() {
		this.board.forEach((row, index, array) => {
			array[index] = row.map(() => {
				return 2;
			});
		});
	},
	toggleEditMode() {
		if (this.editModeActive && !this.board.flat().includes(0) && !this.board.flat().includes(2)) {
			this.board.forEach((row, index, array) => {
				array[index] = row.map(() => {
					return 2;
				});
			});
		} else if (!this.editModeActive && this.board.flat().includes(2)) {
			this.board.forEach((row, index, array) => {
				array[index] = row.map(() => {
					return 1;
				});
			});
		}
		this.editModeActive = !this.editModeActive;
	}
};

const towers = document.getElementsByClassName("tower");
const editButtons = document.getElementsByClassName("editbutton");
const randomButtons = document.getElementsByClassName("randombutton");

function updateView() {
	for (var tower of towers) {
		if (puzzleGameModel.board[Number(tower.dataset.row)][Number(tower.dataset.col)] == 0) {
			tower.setAttribute("src", shattersRedTowerSrc);
		} else if (puzzleGameModel.board[Number(tower.dataset.row)][Number(tower.dataset.col)] == 1) {
			tower.setAttribute("src", shattersGreenTowerSrc);
		} else {
			tower.setAttribute("src", shattersLockedTowerSrc);
		}
	}
	for (var editButton of editButtons) {
		if (puzzleGameModel.editModeActive) {
			editButton.textContent = "resume";
			editButton.setAttribute("title", "exit edit mode and resume playing");
		} else {
			editButton.textContent = "edit";
			editButton.setAttribute("title", "enter edit mode and edit the puzzle");
		}
	}
	for (var randomButton of randomButtons) {
		if (!puzzleGameModel.editModeActive && puzzleGameModel.board.flat().includes(2)) {
			randomButton.textContent = "replay";
		} else {
			randomButton.textContent = "reroll";
		}
	}
}
for (var tower of towers) {
	const row = Number(tower.dataset.row);
	const col = Number(tower.dataset.col);
	tower.addEventListener("click", () => {
		puzzleGameModel.updateBoard(row, col);
		updateView();
	});
}
for (var editButton of editButtons) {
	editButton.addEventListener("click", () => {
		puzzleGameModel.toggleEditMode();
		updateView();
	});
}
for (var randomButton of randomButtons) {
	randomButton.addEventListener("click", () => {
		puzzleGameModel.initialize();
		updateView();
	});
}

puzzleGameModel.initialize();
updateView();
