Bmob.initialize("69151a1d7290cb497aa7bf8900b72dcb", "52e79bc3d145c9e60ed00499a9b8f4ea");
var myresults;

function getlist() {
	console.log("getlist");

	var recordbean = Bmob.Object.extend("SCLRecordBean");
	var query = new Bmob.Query(recordbean);
	//	query.ascending("typeid");
	// 查询所有数据
	query.find({
		success: function(results) {
			console.log("共查询到 " + results.length + " 条记录");

			// 循环处理查询到的数据
			var dataSet = new Array();
			myresults = results.slice(0)
			for(var i = 0; i < results.length; i++) {
				var object = results[i];

				var barr = new Array();

				barr[0] = object.get('department');
				barr[1] = object.get('nickname');
				barr[2] = object.get('sex');
				barr[3] = object.get('age');

				var robj = object.get('resultlist');

				barr[4] = robj[0]['total'];
				barr[5] = robj[0]['totalavg'];
				barr[6] = robj[0]['yescount'];
				//				barr[7] = robj[0]['yesavg'];
				//				barr[8] = robj[0]['nocount'];

				var findex = 7; //少显示2个，太挤
				for(var j = 1; j < robj.length; j++) {
					barr[findex] = robj[j]['totalavg'];
					findex++;
				}

				dataSet.push(barr)
			}

			var page_dt = $('#SCLdt').dataTable({
				"data": dataSet,

				"dom": 'Bfrtip',
				"buttons": [{
					'extend': 'excel',
					'text': '导出', //定义导出excel按钮的文字
					'className': 'btn btn-primary', //按钮的class样式
				}],
				"columns": [{
						"title": "部门",
					},
					{
						"title": "姓名",
					},
					{
						"title": "性别",
					},
					{
						"title": "年龄",
					},
					{
						"title": "总分",
					},
					{
						"title": "总均分",
					},
					{
						"title": " 阳性项目数",
					},
					//					{
					//						"title": "阳性症状均分",
					//					},
					//					{
					//						"title": "阴性项目数",
					//					},
					{
						"title": "躯体化",
					},
					{
						"title": "强迫症状",
					},
					{
						"title": "人际关系敏感",
					},
					{
						"title": "抑郁",
					},
					{
						"title": "焦虑",
					},
					{
						"title": "敌对",
					},
					{
						"title": "恐怖",
					},
					{
						"title": "偏执",
					},
					{
						"title": "精神病性",
					},
					{
						"title": "其他",
					},
					{
						"title": "操作",

					}
				],
				"aoColumnDefs": [ //设置列的属性，此处设置第一列不排序

					{
						"targets": -1,
						"class": "but_xq",
						"data": null,
						"bSortable": false,
						"defaultContent": "<a id=\"edit\" href=\"#\">详情</a>"
					}
				],
				language: {
					"sProcessing": "处理中...",
					"sLengthMenu": "显示 _MENU_ 项结果",
					"sZeroRecords": "没有匹配结果",
					"sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
					"sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
					"sInfoFiltered": "(由 _MAX_ 项结果过滤)",
					"sInfoPostFix": "",
					"sSearch": "搜索:",
					"sUrl": "",
					"sEmptyTable": "表中数据为空",
					"sLoadingRecords": "载入中...",
					"sInfoThousands": ",",
					"oPaginate": {
						"sFirst": "首页",
						"sPrevious": "上页",
						"sNext": "下页",
						"sLast": "末页"
					},
					"oAria": {
						"sSortAscending": ": 以升序排列此列",
						"sSortDescending": ": 以降序排列此列"
					}
				}
			});

			/**
			 * 查看
			 */
			$('#SCLdt tbody').on('click', 'a#edit', function() {
				var data = $('#SCLdt').DataTable().row($(this).parents('tr')).data();

				var rowindex = $(this).parent()[0]._DT_CellIndex.row; //行号

				//此处需要让其动态的生成一个table并填充数据
				var object = myresults[rowindex];

				var tableStr = "";
				var len = 1; //data.workers.length;
				for(var i = 0; i < len; i++) {
					tableStr = tableStr + "<tr><td align='center'>" + object.get('department') +
						"</td>" + "<td align='center'>" + object.get('nickname') + "</td>" +
						"<td align='center'>" + object.get('sex') + "</td>" +
						"<td align='center'>" + object.get('age') + "</td></tr>";
				}

				//将动态生成的table添加的事先隐藏的div中.
				$("#yhdataTable").html(tableStr);

				var robj = object.get('resultlist');

				tableStr = "";
				len = 1; //data.workers.length;
				for(var i = 0; i < len; i++) {
					tableStr = tableStr + "<tr><td align='center'>" + robj[0]['total'] +
						"</td>" + "<td align='center'>" + robj[0]['totalavg'] + "</td>" +
						"<td align='center'>" + robj[0]['yescount'] + "</td>" +
						"<td align='center'>" + robj[0]['nocount'] + "</td>" +
						"<td align='center'>" + robj[0]['yesavg'] + "</td></tr>";
				}

				//将动态生成的table添加的事先隐藏的div中.
				$("#tjdataTable").html(tableStr);

				tableStr = "";
				for(var j = 1; j < robj.length; j++) {
					tableStr = tableStr + "<tr><td align='center'>" + robj[j]['name'] +
						"</td>" + "<td align='center'>" + robj[j]['total'] + "</td>" +
						"<td align='center'>" + robj[j]['totalavg'] + "</td>" +
						"<td align='center'>" + robj[j]['testid'] + "</td>" +
						"<td align='center'>" + robj[j]['score'] + "</td></tr>";
				}
				//将动态生成的table添加的事先隐藏的div中.
				$("#yzdataTable").html(tableStr);

				//$("#myModalLabel").text(data[1] + " 测试详情");
				$('#myModal').modal();

			});

		},
		error: function(error) {
			alert("查询失败: " + error.code + " " + error.message);
		}
	});

}

function getTotalp() {
	var recordbean = Bmob.Object.extend("SCLRecordBean");
	var query = new Bmob.Query(recordbean);

	query.count({
		success: function(count) {
			// 查询成功，返回记录数量
			console.log("共有 " + count + " 条记录");
			$("#totalp").text(count);

		},
		error: function(error) {
			// 查询失败
		}
	});
}

function getTotalpy() {
	var recordbean = Bmob.Object.extend("SCLRecordBean");
	var query = new Bmob.Query(recordbean);
	query.greaterThan("yescount", 43);
	query.count({
		success: function(count) {
			// 查询成功，返回记录数量
			console.log("共有 " + count + " 条记录");
			$("#totalpy").text(count);

		},
		error: function(error) {
			// 查询失败
		}
	});
}

function getTotalpzf() {
	var recordbean = Bmob.Object.extend("SCLRecordBean");
	var query = new Bmob.Query(recordbean);
	query.greaterThan("totalscore", 160);
	query.count({
		success: function(count) {
			// 查询成功，返回记录数量
			console.log("共有 " + count + " 条记录");
			$("#totalpzf").text(count);

		},
		error: function(error) {
			// 查询失败
		}
	});
}