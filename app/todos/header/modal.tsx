'use client';

import { CircleX } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import colors from '../../styles/colors';
import { submitTodoHandler } from './submit-todo';

export const Modal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();

  if (!open) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>New Task</ModalTitle>
          <CloseButton onClick={onClose}>
            <CircleX size={36} color={colors.primary} />
          </CloseButton>
        </ModalHeader>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const title = (form.elements.namedItem('title') as HTMLInputElement)
              .value;
            const description = (
              form.elements.namedItem('description') as HTMLInputElement
            ).value;
            const date = (form.elements.namedItem('date') as HTMLInputElement)
              .value;
            const category = (
              form.elements.namedItem('category') as HTMLInputElement
            ).value;
            if (!title.trim()) {
              alert('Title is required.');
              return;
            }
            const result = await submitTodoHandler({
              title,
              description,
              date,
              category,
            });
            if (result.error) {
              alert(result.error);
              return;
            }
            router.refresh();
            onClose();
          }}
          style={{ width: '100%' }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              width: '100%',
            }}
          >
            <label>
              Název úkolu:
              <input
                name="title"
                type="text"
                required
                style={{
                  width: '100%',
                  padding: 6,
                  borderRadius: 4,
                  border: '1px solid #ccc',
                  marginTop: 4,
                }}
              />
            </label>
            <label>
              Popis:
              <textarea
                name="description"
                rows={3}
                style={{
                  width: '100%',
                  padding: 6,
                  borderRadius: 4,
                  border: '1px solid #ccc',
                  marginTop: 4,
                }}
              />
            </label>
            <label>
              Do kdy:
              <input
                name="date"
                type="date"
                style={{
                  width: '100%',
                  padding: 6,
                  borderRadius: 4,
                  border: '1px solid #ccc',
                  marginTop: 4,
                }}
              />
            </label>
            <label>
              Zodpovědná osoba:
              <input
                name="assignedTo"
                type="text"
                placeholder="Zadejte zodpovědnou osobu"
                style={{
                  width: '100%',
                  padding: 6,
                  borderRadius: 4,
                  border: '1px solid #ccc',
                  marginTop: 4,
                }}
              />
            </label>
            <label>
              Kategorie:
              <input
                name="category"
                type="text"
                placeholder="Zadejte kategorii"
                style={{
                  width: '100%',
                  padding: 6,
                  borderRadius: 4,
                  border: '1px solid #ccc',
                  marginTop: 4,
                }}
              />
            </label>
            <button
              type="submit"
              style={{
                marginTop: 8,
                padding: '8px 16px',
                borderRadius: 6,
                background: colors.primary,
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Přidat úkol
            </button>
          </div>
        </form>
      </ModalBox>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 12px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 22px;
  font-weight: 600;
  color: ${colors.primary};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const ModalBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  padding: 16px;
  border-radius: 12px;
  min-width: 300px;
  min-height: 200px;
`;
