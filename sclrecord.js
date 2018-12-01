Bmob.initialize("69151a1d7290cb497aa7bf8900b72dcb", "52e79bc3d145c9e60ed00499a9b8f4ea");
var myresults;

function getlist() {
	console.log("getlist");

	var recordbean = Bmob.Object.extend("SCLRecordBean");
	var query = new Bmob.Query(recordbean);
	//	query.ascending("typeid");
	query.equalTo("openstatus", "1"); //只查询有效数据
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
				barr[0] = object.id //2018.11.20增加编号
				barr[1] = object.get('department');
				barr[2] = object.get('nickname');
				barr[3] = object.get('sex');
				barr[4] = object.get('age');

				var robj = object.get('resultlist');

				barr[5] = robj[0]['total'];
				barr[6] = robj[0]['totalavg'];
				barr[7] = robj[0]['yescount'];
				//				barr[7] = robj[0]['yesavg'];
				//				barr[8] = robj[0]['nocount'];

				var findex = 8; //少显示2个，太挤
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
						"title": "编号",
					},
					{
						"title": "公司",
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
					tableStr = tableStr + "<tr><td >" + object.get('department') +
						"</td>" + "<td >" + object.get('nickname') + "</td>" +
						"<td >" + object.get('sex') + "</td>" +
						"<td >" + object.get('age') + "</td></tr>";
				}

				//将动态生成的table添加的事先隐藏的div中.
				$("#yhdataTable").html(tableStr);

				//填充 测试指标
				var robj = object.get('resultlist');
				var namestr = new Array("总分", "总均分", "阴性项目数", "阳性项目数", "阳性项目数平均分")
				var nameval = new Array(robj[0]['total'], robj[0]['totalavg'], robj[0]['nocount'], robj[0]['yescount'], robj[0]['yesavg'])
				var tagstr = new Array("129.96±38.76", "1.44±0.43", "65.08±18.33", "24.92±18.41", "2.60±0.59", "1.37±0.48", "1.62±0.58", "1.65±0.51", "1.50±0.59", "1.39±0.43", "1.48±0.56", "1.23±0.41", "1.43±0.57", "1.29±0.42", "")
				var tagval = new Array(0.48, 0.58, 0.51, 0.59, 0.43, 0.56, 0.41, 0.57, 0.42, 1) //标准差
				var tagstd = new Array(1.85, 2.2, 2.16, 2.09, 1.82, 2.04, 1.64, 2, 1.71, 2) //正常分，最后一项小于2正常 2-3轻，3以上重

				tableStr = "";
				len = 5; //data.workers.length;
				for(var i = 0; i < len; i++) {
					tableStr = tableStr + "<tr><td>" + namestr[i] + "</td>" +
						"<td >" + nameval[i] + "</td>" +
						"<td>" + '' + "</td>" +
						"<td>" + '' + "</td>" +
						"<td >" + tagstr[i] + "</td></tr>";
				}

				//填充 因子分数
				for(var j = 1; j < robj.length; j++) {
					tableStr = tableStr + "<tr><td>" + robj[j]['name'] +
						"</td>" + "<td  >" + robj[j]['total'] + "</td>" +
						"<td  >" + robj[j]['totalavg'] + "</td>";

					var mval = parseFloat(robj[j]['totalavg'])

					if(mval > tagstd[j - 1]) {
						mtemp = (mval - tagstd[j - 1]) / tagval[j - 1]
						if(j == robj.length - 1) {
							if(mtemp > 1) //重度
							{
								tableStr = tableStr +
									"<td >" + "重" + "</td>";
							} else //轻度
							{
								tableStr = tableStr +
									"<td >" + "轻" + "</td>";
							}
						} else {
							if(mtemp > 2) //重度
							{
								tableStr = tableStr +
									"<td  >" + "重" + "</td>";
							} else if(mtemp > 1) //中度
							{
								tableStr = tableStr +
									"<td  >" + "中" + "</td>";
							} else //轻度
							{
								tableStr = tableStr +
									"<td  >" + "轻" + "</td>";
							}
						}
					} else //正常
					{
						tableStr = tableStr +
							"<td  >" + "正常" + "</td>";
					}

					tableStr = tableStr + "<td>" + tagstr[j - 1 + len] + "</td></tr>";
				}
				//将动态生成的table添加的事先隐藏的div中.
				$("#tjdataTable").html(tableStr);

				rstr = ""; //结果字符串
				zfstr = "";
				yxstr = "";


				if(parseInt(robj[0]['total']) > 160) {
					zfstr = "总分" + robj[0]['total'] + "分>160分，超出正常范围。";
					
				}

				if(parseInt(robj[0]['yescount']) > 43) {
					yxstr = "阳性项目数" + robj[0]['yescount'] + "项>43项，超出正常范围，各因子分均不同程度升高。";	
				}

				rstr = zfstr + yxstr;
				if(rstr.length == 0) {
					rstr = "无";
				}

				$("#resulttext").text(rstr);
				$("#noLabel").text("编号：" + object.id);
				$("#dateLabel").text("测试日期：" + object.get('testdate'));

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
	query.equalTo("openstatus", "1"); //只查询有效数据
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
	query.equalTo("openstatus", "1"); //只查询有效数据
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
	query.equalTo("openstatus", "1"); //只查询有效数据
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


