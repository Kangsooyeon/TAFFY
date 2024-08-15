import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const [hasAlerted, setHasAlerted] = useState(false);

  useEffect(() => {
    if (!isLoggedIn && !hasAlerted) {
      alert('로그인이 필요합니다');
      setHasAlerted(true); // 경고 메시지를 이미 표시했음을 기록
    }
  }, [isLoggedIn, hasAlerted]);

  if (!isLoggedIn && hasAlerted) {
    return <Navigate to="/login" />;
  }

  return <Element {...rest} />;
};

export default PrivateRoute;
