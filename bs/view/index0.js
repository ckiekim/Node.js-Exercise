module.exports.index = function() {
	return `
		<!DOCTYPE html>
		<html>
		<head>
			<title>Bootstrap 적용</title>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
			<link rel="stylesheet" href="/css/bootstrap.min.css">
		</head>
		<body>
      <div class="container-fluid">
        <div class="jumbotron">
          <h1 class="display-4">Hello, world!</h1>
          <p class="lead">This is a simple hero unit, 
          a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        </div>
        <div class="row">
          <div class="col-md-2">
            <nav class="nav flex-column">
              <a class="nav-link active" href="#">Active</a>
              <a class="nav-link" href="#">Link</a>
              <a class="nav-link" href="#">Link</a>
              <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
            </nav>
          </div>
          <div class="col-md-10">
            <div class="row" style="margin-left: 30px">
              <div class="panel panel-primary">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col" class="col-md-2">#</th>
                      <th scope="col" class="col-md-3">First</th>
                      <th scope="col" class="col-md-3">Last</th>
                      <th scope="col" class="col-md-3">Handle</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-md-1"></div>
            </div>
          </div>
        </div>
      </div>

      <script src = "/js/bootstrap.min.js"></script>
		</body>
		</html>
	`;
			//<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
			//<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
			//<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
}