# Wink Official Backend API - [5ea348c](https://github.com/KMU-WINK/wink-official-backend/tree/5ea348c50daff532b7f9f3350d0b16fa3b4fbaf2)

If accessToken is expired, automatically refresh the token and retry the request.

## Common

### Set Access/Refresh Token

You can set the access token and refresh token by calling the `setToken` method.

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
