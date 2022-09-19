<?php
namespace App\Http\Controllers;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Traits\ApiResponses;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
class AuthController extends Controller
{
    use ApiResponses;
    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        $user = new User([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password'))
        ]);
        $user['avatar'] = 'default_avatar.jpg';
        $user->save();
        return $this->successResponse([], 'Register successfull');
    }
    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = request(['email', 'password']);
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'status' => 'fails',
                'message' => 'Wrong email or password'
            ], 401);
        }
        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        if ($request->input('remember_me')) {
            $token->expires_at = Carbon::now()->addWeeks(1);
        }
        $token->save();
        $user['access_token'] = $tokenResult->accessToken;
        return response()->json($user);
    }
    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->token()->revoke();
        return response()->json([
            'status' => 'success',
        ]);
    }
    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function user(Request $request): JsonResponse
    {
        return response()->json($request->user());
    }
}