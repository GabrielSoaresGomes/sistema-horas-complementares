class CorsMiddleware(object):
    def process_response(req, resp):
        resp["Access-Control-Allow-Origin"] = "*"
        return resp
