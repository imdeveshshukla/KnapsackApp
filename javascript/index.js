// var profits = [20,30,10,50];
// var weights = [1,3,4,6];
// var profits2 = [1,2,5,6];
// var weights2 = [2,3,4,5];
let a;
let prName="",prValue=0,prWeight=0;
const prNaam=[],prVal=[],prW=[],ind=[];
$("#createEx").hide();
$("#enter").on("click",function(e){
    prName=($("#prName").val());
    prValue=Number($("#prValue").val());
    prWeight=Number($("#prWeight").val());
    $("#upperTable").css("visibility","visible"); 
    // console.log(ab);
    
    $("#upperTable").append("<tr><td>"+prName+"</td><td>"+prValue+"</td><td>"+prWeight+"</td></tr>");
    $("input").val();
    prNaam.push(prName);
    prVal.push(prValue);
    prW.push(prWeight);
});
$("#prWeight").on("keypress",function(e){
    // console.log(e.key+" ");
    if(e.key=='Enter'){
        prName=$("#prName").val();
        prValue=Number($("#prValue").val());
        prWeight=Number($("#prWeight").val());
        $("#upperTable").css("visibility","visible"); 
        $("#upperTable").append("<tr><td>"+prName+"</td><td>"+prValue+"</td><td>"+prWeight+"</td></tr>");
        $("input").val();
        prNaam.push(prName);
        prVal.push(prValue);
        prW.push(prWeight);
        console.log("yes");
    }
});
// console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 6)}`);





let solveKnapsack = function(profits, weights, capacity) {
    const n = profits.length;
    if (capacity <= 0 || n == 0 || weights.length != n) return 0;

const dp = Array(profits.length)
    .fill(0)
    .map(() => Array(capacity + 1).fill(0));

// populate the capacity=0 columns; with '0' capacity we have '0' profit
for (let i = 0; i < n; i++) dp[i][0] = 0;

// if we have only one weight, we will take it if it is not more than the capacity
for (let c = 0; c <= capacity; c++) {
    if (weights[0] <= c) dp[0][c] = profits[0];
}

// process all sub-arrays for all the capacities
for (let i = 1; i < n; i++) {
    for (let c = 1; c <= capacity; c++) {
    let profit1 = 0,
        profit2 = 0;
    // include the item, if it is not more than the capacity
    if (weights[i] <= c) profit1 = profits[i] + dp[i - 1][c - weights[i]];
    // exclude the item
    profit2 = dp[i - 1][c];
    // take maximum
    dp[i][c] = Math.max(profit1, profit2);
    }
}

let f=0;
let selectedWeights = [];
let totalProfit = dp[weights.length - 1][capacity];
let remainingCapacity = capacity;
for (let i = weights.length - 1; i > 0; i--) {
    if (totalProfit != dp[i - 1][remainingCapacity]) {
    selectedWeights[f] = weights[i];
    ind[f]=i;
    remainingCapacity -= weights[i];    
    totalProfit -= profits[i];
    f++;
    }
}
if (totalProfit != 0){
    selectedWeights[f] = weights[0];
    ind[f]=0;
}
return selectedWeights;
};

$("#goBtn").on("click",function(){
    a=Number($("#bgWeight").val());
    console.log(`---> ${solveKnapsack(prVal, prW, a)}`);
    $("#lowerTable").css("visibility","visible");
    for (const key in ind) {
        if (Object.hasOwnProperty.call(ind, key)) {
            const element = ind[key];
            $("#lowerTable").append("<tr><td>"+prNaam[element]+"</td><td>"+prVal[element]+"</td><td>"+prW[element]+"</td></tr>");
        }
    }
    $('#createEx').show();
});
$("#bgWeight").on("keypress",function(e){
    if(e.key=='Enter'){
        a=Number($("#bgWeight").val());
        console.log(`---> ${solveKnapsack(prVal, prW, a)}`);
        $("#lowerTable").css("visibility","visible");
        for (const key in ind) {
            if (Object.hasOwnProperty.call(ind, key)) {
                const element = ind[key];
                $("#lowerTable").append("<tr><td>"+prNaam[element]+"</td><td>"+prVal[element]+"</td><td>"+prW[element]+"</td></tr>");
            }
        }
    }
    $('#createEx').show();
});
function exportX(type, fn, dl){
    var elt = document.getElementById('lowerTable');
    var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
    return dl ?
        XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }):
        XLSX.writeFile(wb, fn || ('MySheetName.' + (type || 'xlsx')));
}