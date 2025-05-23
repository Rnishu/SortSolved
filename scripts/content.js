problemTable = document.querySelector('table.problems')

console.assert(problemTable, 'No problems found on the page')

firstRow = problemTable.querySelector('tr')
console.assert(firstRow, 'No first row found in the problems table')

topRight = firstRow.querySelector('.top.right')
console.assert(topRight, 'No top right element found in the first row')

topRight.innerHTML =
    `<a title="Solved" style="text-decoration: none;" class="non-decorated"> 
        <img style="position: relative;top:3px;left:6px;" src="https://codeforces.com/images/icons/ok-16x16.png"> 
        <img style="position: relative; right: 1px; vertical-align: middle;" alt="Sort desc." title="Sort desc." src="//codeforces.org/s/11799/images/datatable/tablesorter-bg.gif">
    </a>`

let sortState = "normal"

topRight.addEventListener('click', () => {
    switch (sortState) {
        case "asc":
        case "normal":
            sortState = "desc"
            topRight.innerHTML =
                `<a title="Solved" style="text-decoration: none;" class="non-decorated">
                    <img style="position: relative;top:3px;left:6px;" src="https://codeforces.com/images/icons/ok-16x16.png">
                    <img style="position: relative; right: 1px; vertical-align: middle;" alt="Sort asc." title="Sort asc." src="//codeforces.org/s/41715/images/datatable/tablesorter-asc.gif">
                </a>`
            problemDivs = Array.from(problemTable.children[0].children)
            problemDivs = problemDivs.slice(1, problemDivs.size)
            problemDivs = problemDivs.sort((a, b) => {
                num1 = a.querySelector('[title="Participants solved the problem"]')
                num2 = b.querySelector('[title="Participants solved the problem"]')
                if (!num1) num1 = " x0"
                else num1 = num1.textContent
                if (!num2) num2 = " x0"
                else num2 = num2.textContent
                num1 = num1.slice(2, num1.size)
                num2 = num2.slice(2, num2.size)
                return num1 - num2;
            }).reverse()

            problemDivsClass = Array(problemDivs.size)
            for (let i in problemDivs) {
                problemDivsClass[i] = problemDivs[i].className;
                problemDivs[i] = problemDivs[i].innerHTML;
            }
            probBody = problemTable.children[0]
            for (let i in problemDivs) {
                probBody.children[Number(i) + 1].className = problemDivsClass[i];
                probBody.children[Number(i) + 1].innerHTML = problemDivs[i];
            }
            break

        case "desc":
            sortState = "asc"
            topRight.innerHTML =
                `<a title="Solved" style="text-decoration: none;" class="non-decorated">
                    <img style="position: relative;top:3px;left:6px;" src="https://codeforces.com/images/icons/ok-16x16.png">
                    <img style="position: relative; right: 1px; vertical-align: middle;" alt="Sort desc." title="Sort desc." src="//codeforces.org/s/31659/images/datatable/tablesorter-desc.gif">
                </a>`
            problemDivs = Array.from(problemTable.children[0].children)
            problemDivs = problemDivs.slice(1, problemDivs.size)
            problemDivs = problemDivs.sort((a, b) => {
                num1 = a.querySelector('[title="Participants solved the problem"]')
                num2 = b.querySelector('[title="Participants solved the problem"]')
                if (!num1) num1 = " x0"
                else num1 = num1.textContent
                if (!num2) num2 = " x0"
                else num2 = num2.textContent
                num1 = num1.slice(2, num1.size)
                num2 = num2.slice(2, num2.size)
                return num1 - num2;
            })

            problemDivsClass = Array(problemDivs.size)
            for (let i in problemDivs) {
                problemDivsClass[i] = problemDivs[i].className;
                problemDivs[i] = problemDivs[i].innerHTML;
            }
            probBody = problemTable.children[0]
            for (let i in problemDivs) {
                probBody.children[Number(i) + 1].className = problemDivsClass[i];
                probBody.children[Number(i) + 1].innerHTML = problemDivs[i];
            }
            break
    }

})

/*
The HTML used in the problemset page is this

Normal:
<th style="width: 4em;" class="top right">
    <a title="Solved" style="text-decoration: none;" href="/problemset?order=BY_SOLVED_DESC" class="non-decorated">
        <img style="position: relative;top:3px;left:6px;" src="https://codeforces.com/images/icons/ok-16x16.png">
        <img style="position: relative; right: 1px; vertical-align: middle;" alt="Sort desc." title="Sort desc." src="//codeforces.org/s/11799/images/datatable/tablesorter-bg.gif">
    </a>
</th>

Sorted Desc: 
<th style="width: 4em;" class="top right">
    <a title="Solved" style="text-decoration: none;" href="/problemset?order=BY_SOLVED_ASC" class="non-decorated">
        <img style="position: relative;top:3px;left:6px;" src="https://codeforces.com/images/icons/ok-16x16.png">
        <img style="position: relative; right: 1px; vertical-align: middle;" alt="Sort asc." title="Sort asc." src="//codeforces.org/s/41715/images/datatable/tablesorter-asc.gif">
    </a> 
</th>

Sorted Asc:
<th style="width: 4em;" class="top right">
    <a title="Solved" style="text-decoration: none;" href="/problemset?order=BY_SOLVED_DESC" class="non-decorated">
        <img style="position: relative;top:3px;left:6px;" src="https://codeforces.com/images/icons/ok-16x16.png">
        <img style="position: relative; right: 1px; vertical-align: middle;" alt="Sort desc." title="Sort desc." src="//codeforces.org/s/31659/images/datatable/tablesorter-desc.gif">
    </a>
</th>

*/