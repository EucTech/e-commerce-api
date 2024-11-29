import { APIGatewayProxyEventV2 } from "aws-lambda";
import { UserService } from "app/service/userService";
import { ErrorResponse } from "app/utility/response";

const service = new UserService();

export const Signup = async (event: APIGatewayProxyEventV2) => {
    return service.CreateUser(event);
}

export const Login = async (event: APIGatewayProxyEventV2) => {
    return service.UserLogin(event);
}

export const Verify = async (event: APIGatewayProxyEventV2) => {
    return service.VerifyUser(event);
}

export const Profile = async (event: APIGatewayProxyEventV2) => {
    const httpMethod = event.requestContext.http.method.toLowerCase();
    if (httpMethod === "post") {
        return service.CreateProfile(event);
    } else if (httpMethod === "get") {
        return service.GetProfile(event);
    } else if (httpMethod === "put") {
        return service.EditProfile(event);
    } else {
        return ErrorResponse(404, "requested method not supported!");
    }
}

export const Cart = async (event: APIGatewayProxyEventV2) => {
    const httpMethod = event.requestContext.http.method.toLowerCase();
    if (httpMethod === "post") {
        return service.CreateCart(event);
    } else if (httpMethod === "get") {
        return service.GetCart(event);
    } else if (httpMethod === "put") {
        return service.UpdateCart(event);
    } else {
        return ErrorResponse(404, "requested method not supported!");
    }
};

export const Payment = async (event: APIGatewayProxyEventV2) => {
    const httpMethod = event.requestContext.http.method.toLowerCase();
    if (httpMethod === "post") {
        return service.CreatePaymentMethod(event);
    } else if (httpMethod === "get") {
        return service.GetPaymentMethod(event);
    } else if (httpMethod === "put") {
        return service.UpdatePaymentMethod(event);
    } else {
        return ErrorResponse(404, "requested method not supported!");
    }
};
