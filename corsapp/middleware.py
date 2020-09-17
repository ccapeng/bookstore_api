class CorsMiddleware(object):

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Headers"] = "*"
        response["Access-Control-Allow-Methods"] = "*"
        #response["Access-Control-Allow-Methods"] = "GET, POST, DELETE, PATCH, DELETE"
        #response["Allow"] = "GET, POST, DELETE, PATCH, DELETE"

        return response