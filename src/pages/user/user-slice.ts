import { createSlice } from '@reduxjs/toolkit';

export interface User {
  id: string;
  name: string;
}

const initialState: User[] = [
  { id: '0', name: 'Tianna Jenkins' },
  { id: '1', name: 'Kevin Grant' },
  { id: '2', name: 'Madison Price' },
];

const userSlice = createSlice({
  initialState,
  name: 'users',
  reducers: {},
});

export default userSlice.reducer;
