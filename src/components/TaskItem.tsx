import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'
import penEdit from '../assets/icons/pen/penEdit.png';

export interface Task {
    id: number;
    title: string;
    done: boolean;
}

interface TaskItemProps {
    item: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (id: number, title: string) => void;
}

export function TaskItem({ item, toggleTaskDone, removeTask, editTask }: TaskItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [taskEdited, setTaskEdited] = useState(item.title);

    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing() {
        setIsEditing(true);
    }

    function handleCancelEditing() {
        setTaskEdited(item.title);
        setIsEditing(false);
    }

    function handleSubmitEditing() {
        editTask(item.id, taskEdited);
        setIsEditing(false);
    }

    useEffect(() => {
        if (textInputRef.current) {
            if (isEditing) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();
            }
        }
    }, [isEditing]);

    return (
        <>
            <View>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(item.id)}
                >
                    <View
                        style={item.done ? styles.taskMarkerDone : styles.taskMarker}
                    >
                        {item.done && (
                            <Icon
                                name="check"
                                size={12}
                                color="#FFF"
                            />
                        )}
                    </View>
                    {
                        isEditing ? (
                            <TextInput
                                ref={textInputRef}
                                style={item.done ? styles.taskTextDone : styles.taskText}
                                value={taskEdited}
                                editable={isEditing}
                                onChangeText={setTaskEdited}
                                onSubmitEditing={handleSubmitEditing}
                            />
                        ) : (
                            <Text
                                style={item.done ? styles.taskTextDone : styles.taskText}
                            >
                                {item.title}
                            </Text>
                        )
                    }

                </TouchableOpacity>
            </View>

            <View style={styles.iconsContainer}>
                {isEditing ? (
                    <TouchableOpacity
                        style={{ paddingHorizontal: 24 }}
                        onPress={handleCancelEditing}
                    >
                        <Icon name='x' size={16} color='#B2B2B2'/>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={{ paddingHorizontal: 16 }}
                        onPress={handleStartEditing}
                    >
                        <Image source={penEdit} />
                    </TouchableOpacity>
                )}

                <View style={styles.iconsDivider} />

                <TouchableOpacity
                    style={{ paddingHorizontal: 16 }}
                    onPress={() => removeTask(item.id)}
                    disabled={isEditing}
                >
                    <Image
                    source={trashIcon}
                    style={{ opacity: isEditing ? 0.2 : 1 }}
                    />
                </TouchableOpacity>

            </View>
        </>
    );
}

const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    },
    iconsContainer: {
        flexDirection: 'row',
    },
    iconsDivider: {
        width: 1,
        height: 24,
        backgroundColor: 'rgba(196, 196, 196, 0.24)'
    }
})
