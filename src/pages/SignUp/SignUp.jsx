import React, { useState, useEffect } from 'react';
import AccountActionLink from '@/atoms/AccountActionLink/AccountActionLink';
import AccountPageTitle from '@/atoms/AccountPageTitle/AccountPageTitle';
import EmailInput from '@/atoms/EmailInput/EmailInput';
import PasswordInput from '@/atoms/PasswordInput/PasswordInput';
import SubmitButton from '@/atoms/SubmitButton/SubmitButton';
import Checkbox from '@/atoms/Checkbox/Checkbox';
import PocketBase from 'pocketbase';
import { useNavigate } from 'react-router-dom';

const pb = new PocketBase('https://pocket10.kro.kr');

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const passwordsMatch = password === confirmPassword && confirmPassword !== '';
    setIsFormValid(emailValid && passwordValid && passwordsMatch && termsChecked);
  }, [emailValid, passwordValid, password, confirmPassword, termsChecked]);

  // 비밀번호 유효성 검사 결과 처리 함수
  const handlePasswordValidationChange = (isValid) => {
    setPasswordValid(isValid);
    // 추가 작업 가능, 예를 들어 상태 업데이트나 경고 메시지 표시 등
  };

  // 이메일 유효성 검사 결과 처리 함수
  const handleEmailValidationChange = (isValid) => {
    setEmailValid(isValid);
    // 추가 작업 가능
  };

  // 이메일 중복 확인 함수
  const checkEmailExists = async (emailToCheck) => {
    try {
      const userRecords = await pb.collection('users').getList(1, 1, {
        filter: `email='${emailToCheck}'`,
      });
      return userRecords.items.length > 0;
    } catch (error) {
      console.error('Error checking email existence:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isFormValid) return;

    const emailExists = await checkEmailExists(email);

    if (emailExists) {
      alert('이미 존재하는 이메일 주소입니다. 다른 이메일 주소를 사용해주세요.');
      return;
    }

    const data = {
      username: email.split('@')[0],
      email: email,
      password: password,
      passwordConfirm: password,
      emailVisibility: true,
      handle: '',
      isPrivate: false,
      isProtect: false,
      isFirstLogin: true,
      album: [],
      board: [],
      bookmark: [],
      community: [],
    };

    try {
      await pb.collection('users').create(data);
      alert('축하합니다! 회원가입 완료되었습니다.');
      navigate('/splash/signin');
    } catch (error) {
      console.error(error);
      alert('이미 존재하는 이메일 주소입니다. 다른 이메일 주소를 사용해주세요.');
    }
  };

  return (
    <div className="w-[320px] h-[650px] mx-auto flex flex-col items-center justify-start">
      <AccountPageTitle text="회원가입" className="mt-75px mb-43px" />
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
        <EmailInput
          value={email}
          onChange={(inputedEmail) => {
            setEmail(inputedEmail);
          }}
          onValidationChange={handleEmailValidationChange}
        />
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onValidationChange={handlePasswordValidationChange}
          className="mt-18px"
        />
        <PasswordInput
          text="패스워드 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mt-18px"
          isConfirm={true}
          password={password}
          onValidationChange={(isValid) => setPasswordValid(isValid && password === confirmPassword)}
        />
        <Checkbox
          text="이용약관에 동의합니다"
          className="mt-16px w-full px-20px"
          onChange={(e) => setTermsChecked(e.target.checked)}
        />
        <SubmitButton isFormValid={isFormValid} text="회원가입" className="mt-31px" />
      </form>
      <AccountActionLink text="로그인" />
    </div>
  );
};

export default SignUp;
