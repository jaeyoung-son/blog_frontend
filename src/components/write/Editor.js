import React, { useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import styled from 'styled-components';

function Editor({ title, body, onChangeField }) {
  const quillElement = useRef(null); // 퀼을 적용할 디브
  const quillInstance = useRef(null); // 퀼 인스턴스

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: 'bubble',
      placeholder: '내용을 작성하세요..',
      modules: {
        // 나머지 옵션들 quilljs.com 모듈스 참고
        toolbar: [
          [{ header: '1' }, { header: '2' }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['blockquote', 'code-block', 'link', 'image'],
        ],
      },
    });

    // 퀼에 텍스트 체인지 이벤트 핸들러 등록
    const quill = quillInstance.current;
    quill.on('text-change', (delta, oldDelta, source) => {
      if (source === 'user') {
        onChangeField({ key: 'body', value: quill.root.innerHTML });
      }
    });
  }, [onChangeField]);

  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    quillInstance.current.root.innerHTML = body;
    // eslint disable 해서 의존성배열을 빈배열로 두거나 위처럼 레프값으로 초기마운트 잡거나
    // useEffect 의존성 배열은 유즈이펙트 안에서 사용하는 모든 외부값을 의존성에 넣는것을 권장
  }, [body]);

  const onChangeTitle = (e) => {
    onChangeField({ key: 'title', value: e.target.value });
  };

  return (
    <EditorBlock>
      <TitleInput
        onChange={onChangeTitle}
        value={title}
        placeholder="제목을 입력하세요"
      />
      <QuillWrapper>
        <div ref={quillElement} />
      </QuillWrapper>
    </EditorBlock>
  );
}

export default Editor;

const EditorBlock = styled(Responsive)`
  padding-top: 5rem;
  padding-bottom: 5rem;
`;

const TitleInput = styled.input`
  font-size: 3rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[4]};
  margin-bottom: 2rem;
  width: 100%;
`;

const QuillWrapper = styled.div`
  /* 최소 크기 지정 과 패딩 제거 */
  .ql-editor {
    padding: 0;
    min-height: 320px;
    font-size: 1.125rem;
    line-height: 1.5;
  }
  .ql-editor.ql-blank::before {
    left: 0px;
  }
`;
