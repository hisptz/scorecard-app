import i18n from "@dhis2/d2-i18n";
import {
  Button,
  ButtonStrip,
  CenteredContent,
  colors,
  Modal,
  ModalActions,
  ModalContent,
  ModalTitle,
} from "@dhis2/ui";
import ErrorIcon from "@material-ui/icons/Error";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function ErrorDialog({ error, onClose }) {
  const { details } = error ?? {};
  return (
    <Modal position="middle" onClose={onClose}>
      <ModalTitle>{i18n.t("Error Details")}</ModalTitle>
      <ModalContent>
        <div
          style={{
            background: colors.grey050,
            padding: 24,
            border: `1px solid ${colors.grey300}`,
          }}
        >
          <code style={{ fontSize: 14 }}>{JSON.stringify(details)}</code>
        </div>
      </ModalContent>
      <ModalActions>
        <Button onClick={onClose}>{i18n.t("Close")}</Button>
      </ModalActions>
    </Modal>
  );
}

ErrorDialog.propTypes = {
  error: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default function FullPageError({ error, resetErrorBoundary }) {
  const [errorDialogShow, setErrorDialogShow] = useState(false);
  const history = useHistory();

  const onRefresh = () => {
    if (resetErrorBoundary) {
      resetErrorBoundary();
    } else {
      window.location.reload();
    }
  };

  const onGoToHome = () => {
    if (history) {
      history?.replace("/");
    } else {
      onRefresh();
    }
  };

  return (
    <div
      className="column center "
      style={{ height: "100%", textAlign: "center" }}
    >
      <CenteredContent>
        <div className="column align-items-center">
          <ErrorIcon
            style={{ color: colors.grey700, fontSize: 64 }}
            fontSize="large"
          />
          <h2 style={{ color: colors.grey700, margin: 8 }}>
            {error?.title ?? i18n.t("Something Went Wrong")}
          </h2>
          <p style={{ color: colors.grey700 }}>
            {typeof error === "string" ? error : error?.message}
          </p>
          <ButtonStrip center>
            {error?.details?.httpStatusCode === 404 ? (
              <Button primary onClick={onGoToHome}>
                {i18n.t("Back to scorecard list")}
              </Button>
            ) : (
              <Button onClick={onRefresh}>{i18n.t("Refresh")}</Button>
            )}
            {error?.details && (
              <Button onClick={() => setErrorDialogShow(true)}>
                {i18n.t("View error logs")}
              </Button>
            )}
          </ButtonStrip>
        </div>
        {errorDialogShow && (
          <ErrorDialog
            error={error}
            onClose={() => setErrorDialogShow(false)}
          />
        )}
      </CenteredContent>
    </div>
  );
}

FullPageError.propTypes = {
  error: PropTypes.any,
  resetErrorBoundary: PropTypes.func,
};
