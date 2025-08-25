export class reqresStepHelpers {
  private I: CodeceptJS.I;

  constructor(I: CodeceptJS.I) {
    this.I = I;
  }

  async getUserList(page: number, per_page: number) { 
    let userListResponse = await this.I.sendGetRequest(`/api/users?page=${page}&per_page=${per_page}`);
    
    return userListResponse.data;
  }

  async oddUserID(userListResponse: any) {
    const oddIDUsers = userListResponse.data.filter((user: any) => user.id % 2 !== 0);
    console.log('Users with Odd ID numbers:');
    oddIDUsers.forEach((user: any) => {
      console.log(`- ID: ${user.id}, Name: ${user.first_name} ${user.last_name}`);
    });
    this.I.say(`Odd ID Users: ${JSON.stringify(oddIDUsers, null, 2)}`);
    return oddIDUsers;
  }

}