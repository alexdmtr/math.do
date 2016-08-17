var inputTimeout;

$(document).ready(function() {


	$('#queryBox').on('input', function() {
	
		clearTimeout(inputTimeout);
		inputTimeout = setTimeout(doQueryResult, 250);
	});

	$('#queryBox').focus();
});

function doQueryResult()
{
	var queryResult;
	var queryText = $("#queryBox").val();

	var tokens = parseTokens(queryText);


	// var obj = findObject(objects, tokens[0]);

	// if (obj != null)
	// {
	// 	$("#object-title").text(obj.title);
	// 	$("#object-definition").text(obj.definition);

	// 	$("#object-container").show();
	// 	$("#result-text").hide();
	// }

	var tokenExpression = evaluateTokens(tokens, 0, tokens.length);


	$("#tokensText").text(tokens);

	try
	{
		if (tokenExpression[tokenExpression.length-1] != ')')
			tokenExpression = tokenExpression + "()";
		$("#tokensEvalText").text(tokenExpression);

		var tokenResult = eval(tokenExpression);

		
		$("#resultText").text("= " + tokenResult.info);
	}
	catch (e)
	{
		try
		{
			queryResult = evaluate(queryText);

			$("#resultText").text("= " + queryResult);
			// $("#resultText").text("= " + queryResult);
		}
		catch (e)
		{
			$("#resultText").text("");
		}
	}

}