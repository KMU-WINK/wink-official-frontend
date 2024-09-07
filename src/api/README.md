# Wink Official Backend API

만약 Access Token이 만료되었을 경우, 쿠키의 Refresh Token을 사용하여 새로운 Access Token을 발급받은 후, 쿠키에 다시 저장합니다.

## Common

### Wrapper

RootLayout에 아래 코드를 추가하세요.
```tsx
<WinkApiApplication>{children}</WinkApiApplication>
```

### Set Access/Refresh Token

WinkApi가 초기화될 때, 쿠키에 저장된 Token을 사용합니다.

만약 로그인 및 로그아웃과 같이 수동으로 Token을 설정해야 한다면, 아래와 같이 사용하세요.

(쿠키는 자동으로 업데이트됩니다.)

```ts
WinkApi.Request.setToken({
  accessToken: '',
  refreshToken: '',
});
```

## Client-Side API

```tsx
'use client';

const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  
  const onLogin = async () => {
    const { accessToken, refreshToken } = await WinkApi.Auth.login({ email, password });

    WinkApi.Request.setToken({ accessToken, refreshToken });
  };

  return (
    <div>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={onLogin}>Login</button>
    </div>
  );
}
```
---
```tsx
'use client';

const MemberPage = () => {
  const { fetching, content: { members } } = useWinkApi(
    WinkApi.Member.getMembers()
  );

  if (fetching) return <div>Loading...</div>;

  return (
    <div>
      <h1>Members</h1>
      <ul>
        {members.map((member) => (
          <li key={member.memberId}>{member.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

## Server-Side API

```tsx
const MemberList = async () => {
  const { members } = await WinkApi.Member.getMembers();

  return (
    <div>
      <h1>Members</h1>
      <ul>
        {members.map((member) => (
          <li key={member.memberId}>{member.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

## User Store

```tsx
const MyPage = () => {
  const { user } = useUserStore();

  return (
    <div>
      <h1>My Info</h1>
        
      <div>
        <span>Name: {user.name}</span>
        <span>Email: {user.email}</span>
      </div>
    </div>
  );
}
```
