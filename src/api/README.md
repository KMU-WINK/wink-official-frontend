# Wink Official Backend API - [5ea348c](https://github.com/KMU-WINK/wink-official-backend/tree/5ea348c50daff532b7f9f3350d0b16fa3b4fbaf2)

만약 Access Token이 만료되었을 경우, 쿠키의 Refresh Token을 사용하여 새로운 Access Token을 발급받은 후, 쿠키에 다시 저장합니다.

## Common

### Set Access/Refresh Token

WinkApiRequest가 초기화될 때, 알아서 쿠키로부터 Access Token과 Refresh Token을 가져옵니다.

만약 로그인같이, 수동으로 Access Token과 Refresh Token을 설정하고 싶다면, 다음과 같이 사용합니다.
(이 때, setToken의 인자로 전달된 토큰은 알아서 쿠키에 저장됩니다.)
```javascript
WinkApi.setToken({
    accessToken: '',
    refreshToken: '',
});
```

## Client-Side API

```javascript
const MemberList = () => {
    const {fetching, code, error, content} = useWinkApi(
        WinkApi.Member.getMembers()
    );
  
    if (fetching) return <div>Loading...</div>;
    
    if (error) return <div>Error: {code} - {content.unwrapError()}</div>;
  
    return (
        <div>
            <h1>Members</h1>
            <ul>
                {content.unwrap().map((member) => (
                    <li key={member.memberId}>{member.name}</li>
                ))}
            </ul>
        </div>
    );
}
```

## Server-Side API

```javascript
const MemberList = async () => {
    const {code, error, content} = await WinkApi.Member.getMembers();
  
    if (error) return <div>Error: {code} - {content.unwrapError()}</div>;
  
    return (
        <div>
            <h1>Members</h1>
            <ul>
                {content.unwrap().map((member) => (
                    <li key={member.memberId}>{member.name}</li>
                ))}
            </ul>
        </div>
    );
}
```
