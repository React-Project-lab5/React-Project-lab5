// 띄워줄 데이터 key값에 고유ID를 넣어준다.
export function ShowMeetings({ users }) {
  console.log(users);
  return users.map((value, index) => (
    <div key={index}>
      <h1>title: {value.title}</h1>
      <h1>address: {value.address}</h1>
    </div>
  ));
}
