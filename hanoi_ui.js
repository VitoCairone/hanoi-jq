$(function() {

	var $id_list = ['#tower1', '#tower2', '#tower3']

	var towers = [Hanoi.tower1, Hanoi.tower2, Hanoi.tower3];

	function clearBlocks() {
		$("#tower1").empty();
		$("#tower2").empty();
		$("#tower3").empty();
	}

	function renderBlocks() {
		clearBlocks();
		for (var i = 0; i < 3; i++) {
			var tower = towers[i];
			for (var j = tower.length - 1; j >= 0; j--) {
				$($id_list[i]).append($('<div class="disc" id="disc' + tower[j] + '">'))
			}
		}
  }

	renderBlocks();

	var from = undefined;

	for (var i = 1; i <= 3; i++) {
		console.log("Setting up listener")
		$("#tower" + i).on("click", function() {
			var num = this.id[5]
			//console.log("Detected click of tower");
			//console.log("from is " + from);
			//console.log("i is " + i);
			//console.log(this.id[5]);
			$("#messages").text("");

			if(from === undefined) {
				//Clicking a Tower when No Tower is Hilighted (no From selected)
				$("#tower" + num).toggleClass("towerHilight");
				from = num - 1;
			} else {
				//Clicking a Tower when a Tower is Already Hilighted
				$("#tower" + (from + 1)).toggleClass("towerHilight");
				if(Hanoi.move_valid(towers[from], towers[num - 1])) {

					//Legal Move
					Hanoi.move(towers[from], towers[num - 1]);
					renderBlocks();
				} else {

					//Illegal Move
					$("#messages").text("Illegal Move.");
				}
				from = undefined;
			}

			//Check for win
			if (Hanoi.won()) {
				$("#messages").text("You win!")
			}
		});
	}

	// $("#tower2").on("click", function() {
// 		//console.log("Detected click of tower1");
// 		if(from === undefined) {
// 			$("#tower2").toggleClass("towerHilight");
// 			from = 1;
// 		} else {
// 			$("#tower" + (from + 1)).toggleClass("towerHilight");
// 			if(Hanoi.move_valid(towers[from], towers[1])) {
// 				Hanoi.move(towers[from], towers[1]);
// 				renderBlocks();
// 			} else {
// 				;//?? Invalid Move
// 			}
// 			from = undefined;
// 		}
// 	});

})
