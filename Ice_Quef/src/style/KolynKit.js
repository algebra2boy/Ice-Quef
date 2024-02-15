export function kolynScreen(screenBackground) {
    return {
        flex: 1,
        padding: 24,
        backgroundColor: screenBackground,
    }
}

export function kolynInputfield(background, font) {
    return {
        margin: 12,
        backgroundColor: background,
        padding: 10,
        borderRadius: 10,
        fontFamily: font,
        alignSelf: 'center',
    };
}

export function kolynButton(buttonBackground) {
    return {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 1,
        paddingHorizontal: 1,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: buttonBackground,
        alignSelf: 'center',
    };
}

export function kolynLabel(fontSize, font, fontColor) {
    return {
        fontSize: fontSize,
        fontFamily: font,
        color: fontColor,
    };
}
