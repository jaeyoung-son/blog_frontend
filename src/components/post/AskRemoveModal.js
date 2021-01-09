import React from 'react';
import AskModal from '../common/AskModal';

function AskRemoveModal({ visible, onConfirm, onCancel }) {
  return (
    <AskModal
      visible={visible}
      title="포스트 삭제"
      description="포스트를 정말 삭제하시겠습니까?"
      confirmText="삭제"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}

// 따로 만드는 이유는 모달의 개수가 많아졌을 때 관리하기가 편해짐
export default AskRemoveModal;
