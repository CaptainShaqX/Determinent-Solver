document.addEventListener("DOMContentLoaded", function () {
const rowsInput = document.getElementById("rows");
const colsInput = document.getElementById("cols");
const matrixInput = document.getElementById("matrix-input");
const calculateBtn = document.getElementById("calculate-btn");
const resultDiv = document.getElementById("result");

// Function to create input fields for matrix elements
function createMatrixInputs(rows, cols) {
        matrixInput.innerHTML = "";
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const input = document.createElement("input");
                input.setAttribute("type", "number");
                input.setAttribute("placeholder", `A${i + 1}${j + 1}`);
                matrixInput.appendChild(input);
            }
            matrixInput.appendChild(document.createElement("br"));
        }
}

// Function to calculate the determinant of an M x N matrix
 function calculateDeterminant() {
        const M = parseInt(rowsInput.value);
        const N = parseInt(colsInput.value);
        const elements = matrixInput.querySelectorAll("input");
        const matrix = [];

// Populate the matrix with user inputs
        for (let i = 0; i < M; i++) {
            const row = [];
            for (let j = 0; j < N; j++) {
                row.push(parseFloat(elements[i * N + j].value));
            }
            matrix.push(row);
        }

        const determinant = calculateDeterminantRecursive(matrix);
        resultDiv.textContent = `Determinant: ${determinant}`;

        // Added animation to the result
        resultDiv.classList.add("button-pulse");
        setTimeout(() => {
            resultDiv.classList.remove("button-pulse");
        }, 1500);
    }

// Event listener for the "Calculate Determinant" button
calculateBtn.addEventListener("click", calculateDeterminant);

// Event listener for changes in the number of rows and columns
rowsInput.addEventListener("input", function () {
        const M = parseInt(rowsInput.value);
        const N = parseInt(colsInput.value);
        createMatrixInputs(M, N);
});

colsInput.addEventListener("input", function () {
        const M = parseInt(rowsInput.value);
        const N = parseInt(colsInput.value);
        createMatrixInputs(M, N);
});

// Recursive function to calculate the determinant of a square matrix
function calculateDeterminantRecursive(matrix) {
        const M = matrix.length;
        const N = matrix[0].length;

        if (M !== N) {
            return "Matrix must be square (M x M) for determinant calculation.";
        }

        if (M === 1) {
            // Base case: determinant of a 1x1 matrix
            return matrix[0][0];
        }

        if (M === 2) {
            // Base case: determinant of a 2x2 matrix
            const a = matrix[0][0];
            const b = matrix[0][1];
            const c = matrix[1][0];
            const d = matrix[1][1];
            return a * d - b * c;
        }

        // Calculate determinant for larger matrices using recursive expansion by minors
        let det = 0;
        for (let i = 0; i < M; i++) {
            const minor = [];
            for (let j = 1; j < M; j++) {
                const row = [];
                for (let k = 0; k < M; k++) {
                    if (k !== i) {
                        row.push(matrix[j][k]);
                    }
                }
                minor.push(row);
            }
            const sign = i % 2 === 0 ? 1 : -1;
            det += sign * matrix[0][i] * calculateDeterminantRecursive(minor);
        }

        return det;
}
});
