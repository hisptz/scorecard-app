import i18n from "@dhis2/d2-i18n";
import {
	Button,
	ButtonStrip,
	CenteredContent,
	colors,
	IconError24,
	Modal,
	ModalActions,
	ModalContent,
	ModalTitle
} from "@dhis2/ui";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDataQuery } from "@dhis2/app-runtime";
import { FallbackProps } from "react-error-boundary";
import { IconResize } from "@/shared/components/IconResize";

function ErrorDialog({
						 error,
						 onClose
					 }: {
	error: Error | ReturnType<typeof useDataQuery>["error"];
	onClose: () => void;
}) {
	const { details } = error ?? {};
	return (
		<Modal position="middle" onClose={onClose}>
			<ModalTitle>{i18n.t("Error Details")}</ModalTitle>
			<ModalContent>
				<div
					style={{
						background: colors.grey050,
						padding: 24,
						border: `1px solid ${colors.grey300}`
					}}
				>
					<code style={{ fontSize: 14 }}>
						{JSON.stringify(details)}
					</code>
				</div>
			</ModalContent>
			<ModalActions>
				<Button onClick={onClose}>{i18n.t("Close")}</Button>
			</ModalActions>
		</Modal>
	);
}

export default function FullPageError({
										  error,
										  resetErrorBoundary
									  }: FallbackProps) {
	const [errorDialogShow, setErrorDialogShow] = useState(false);
	const navigate = useNavigate();

	const onRefresh = () => {
		if (resetErrorBoundary) {
			resetErrorBoundary();
		} else {
			window.location.reload();
		}
	};

	const onGoToHome = () => {
		if (navigate) {
			navigate("/", {
				replace: true
			});
		} else {
			onRefresh();
		}
	};

	return (
		<div
			className="flex flex-col gap-2 center items-center"
			style={{ height: "100%", textAlign: "center" }}
		>
			<CenteredContent>
				<div className="flex flex-col justify-center items-center gap-4">
					<IconResize size={64}>
						<IconError24
							color={colors.grey700}
						/>
					</IconResize>
					<div>
						<h2 className="text-2xl font-bold" style={{ color: colors.grey700, margin: 8 }}>
							{error?.title ?? i18n.t("Something Went Wrong")}
						</h2>
						<span style={{ color: colors.grey700 }}>
							{typeof error === "string" ? error : error?.message}
						</span>
					</div>
					<ButtonStrip>
						{error?.details?.httpStatusCode === 404 ? (
							<Button primary onClick={onGoToHome}>
								{i18n.t("Back to scorecard list")}
							</Button>
						) : (
							<Button onClick={onRefresh}>
								{i18n.t("Refresh")}
							</Button>
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
