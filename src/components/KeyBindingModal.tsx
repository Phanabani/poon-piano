// REACT
import React, { CSSProperties, FC, useState } from 'react';

// LOCAL FILES
// Constants
import {
  NoteToKeyBinding,
  Note,
  NOTE_DISPLAY_NAMES,
  NOTES,
} from '../constants';
// Utility functions
import { isMobileDevice } from 'utils';

const styles: { [key: string]: CSSProperties } = {
  openModalButton: {
    backgroundColor: '#40b9eb', // TODO: Change based on theme
    color: 'white',
    border: '1px solid white',
    marginLeft: '16px',
  },
  modalOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 1,
  },
  modal: {
    position: 'absolute',
    top: 16,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 300,
    zIndex: 2,
  },
  modalContainer: {
    backgroundColor: '#fafafa',
    borderRadius: 8,
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 16px 0 16px',
    marginBottom: 8,
  },
  modalHeading: {
    fontSize: '3rem',
    margin: 0,
  },
  closeModalButton: {
    border: 0,
    borderRadius: '50%',
    backgroundColor: 'transparent',
    padding: 0,
  },
  modalBody: {
    maxHeight: 500,
    overflowY: 'auto',
  },
  modalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 16px',
    marginBottom: 8,
  },
  modalColumn: {
    width: '50%',
  },
  keyBindingInput: {
    textTransform: 'uppercase',
    textAlign: 'center',
  },
};

interface KeyBindingToUses {
  [binding: string]: number;
}

interface KeyBindingModalProps {
  noteToKeyBinding: NoteToKeyBinding;
  onChange: (note: Note, key: string) => void;
}

export const KeyBindingModal: FC<KeyBindingModalProps> = ({
  noteToKeyBinding,
  onChange,
}) => {
  // LOCAL STATE
  const [modalShowing, showModal] = useState(false);

  // HANDLERS
  const onOpenModalClick = () => {
    showModal(true);
  };

  const onModalClose = () => {
    showModal(false);
  };

  const onKeyBindingChange = (note: Note, key: string) => {
    onChange(note, key);
  };

  // RENDERING
  if (isMobileDevice()) {
    return null;
  }

  const keyBindingToUses = Object.values(
    noteToKeyBinding,
  ).reduce<KeyBindingToUses>((previousKeyBindingToUses, binding) => {
    if (typeof previousKeyBindingToUses[binding] === 'undefined') {
      previousKeyBindingToUses[binding] = 0;
    }

    previousKeyBindingToUses[binding] += 1;
    return previousKeyBindingToUses;
  }, {});

  return (
    <>
      <button
        onClick={onOpenModalClick}
        style={styles.openModalButton}
        type="button"
      >
        Edit Key Bindings
      </button>
      {modalShowing && (
        <>
          <div
            onClick={onModalClose}
            onKeyPress={() => {}}
            role="none"
            style={styles.modalOverlay}
          />
          <div style={styles.modal}>
            <div style={styles.modalContainer}>
              <div style={styles.modalHeader}>
                <h2 style={styles.modalHeading}>Key Bindings</h2>
                <button
                  onClick={onModalClose}
                  style={styles.closeModalButton}
                  type="button"
                >
                  X
                </button>
              </div>
              <div style={styles.modalBody}>
                {NOTES.map((note) => {
                  const binding = noteToKeyBinding[note];
                  const showWarning = keyBindingToUses[binding] > 1;

                  return (
                    <div key={note} style={styles.modalRow}>
                      <div style={styles.modalColumn}>
                        {NOTE_DISPLAY_NAMES[note]}
                      </div>
                      <input
                        onChange={() => {}}
                        onKeyDown={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          onKeyBindingChange(note, event.key);
                        }}
                        style={{
                          ...styles.modalColumn,
                          ...styles.keyBindingInput,
                          borderColor: showWarning
                            ? 'red'
                            : 'transparent',
                        }}
                        value={binding}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
