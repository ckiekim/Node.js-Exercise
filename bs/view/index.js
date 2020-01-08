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

      <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container-fluid">
          <div class="row">
            <div class="col-7">
              <img alt="Brand" src="EzenLogo.png">
            </div>
            <div class="col-3">
              <p class="navbar-text navbar-right">
                한국표준협회<br>
                홍길동님님 환영합니다.
              </p>
            </div>
            <div class="col-2">
              <p class="navbar-text navbar-center">
                흐림<br>
                <a href="#">로그아웃</a>
              </p>
            </div>
          </div>
        </div>
      </nav>
      <div class="row" style="margin-top: 10px">
        <div class="col-2">
          <nav class="nav flex-column">
            <a class="nav-link active" href="#">Active</a>
            <a class="nav-link" href="#">Link</a>
            <a class="nav-link" href="#">Link</a>
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
          </nav>
        </div>
        <div class="col-10">
          <div class="row" style="margin-left: 10px">
            <div class="col-7"><h3>출고대기목록 조회</h3></div>
            <div class="col-5"><br>
              <a class="btn btn-primary" href="#" role="button">버튼 1</a>&nbsp;&nbsp;&nbsp;
              <a class="btn btn-primary" href="#" role="button">버튼 2</a>
            </div>
            <div class="col-12"><hr></div>
            <div class="col-10">

                <table class="table table-condensed table-hover">
                  <thead class="thead-light">
                    <tr class="active">
                      <th scope="col">#</th><th scope="col">First</th>
                      <th scope="col">Last</th><th scope="col">Handle</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th><td>Mark</td><td>Otto</td><td>@mdo</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th><td>Jacob</td><td>Thornton</td><td>@fat</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th><td>Larry</td><td>the Bird</td><td>@twitter</td>
                    </tr>
                  </tbody>
                </table>

            </div>
            <div class="col-2"></div>
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