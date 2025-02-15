import { RadioButtonCheckedTwoTone } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { colors } from 'presentation/style/palette';
import type { FC, ReactNode } from 'react';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    primary: true;
    secondary: true;
  }
}
declare module '@mui/material/TextField' {
  interface TextFieldPropsColorOverrides {
    isSelect: true;
    hide: true;
  }
}

interface Children {
  children: ReactNode;
}

export const MaterialUIProvider: FC<Children> = ({ children }: Children) => {
  const LightTheme = createTheme({
    components: {
      MuiButton: {
        defaultProps: {
          variant: 'contained'
        },
        styleOverrides: {
          root: {
            borderRadius: '4px',
            color: 'white',
            fontSize: '16px',
            padding: '6px 16px',
            textTransform: 'capitalize'
          }
        },
        variants: [
          {
            props: { color: 'info' },
            style: {
              ':hover': { backgroundColor: colors.gray[200] },
              backgroundColor: colors.gray[125],
              boxShadow: '0',
              color: `${colors.gray[900]} !important`,
              svg: { color: colors.gray[900] }
            }
          },
          {
            props: { color: 'warning' },
            style: {
              ':hover': { backgroundColor: colors.gray[200] },
              backgroundColor: colors.gray[125],
              color: colors.primary
            }
          },
          {
            props: { color: 'success' },
            style: {
              ':hover': {
                backgroundColor: '#dbdada'
              },
              backgroundColor: colors.gray[300],
              color: colors.gray[900],
              svg: {
                color: colors.black
              }
            }
          },
          {
            props: { variant: 'outlined' },
            style: {
              color: colors.primary,
              svg: {
                color: colors.primary
              }
            }
          },
          {
            props: { variant: 'contained' },
            style: {
              fontWeight: '700'
            }
          },
          {
            props: { color: 'error' },
            style: {
              ':hover': {
                backgroundColor: '#dfc7c7'
              },
              backgroundColor: '#FFE5E5',
              color: '#FF0000'
            }
          },
          {
            props: { size: 'large' },
            style: {
              minHeight: '48px'
            }
          },
          {
            props: { color: 'secondary' },
            style: {
              ':hover': {
                backgroundColor: colors.gray[200],
                borderColor: colors.gray[900]
              },
              backgroundColor: colors.white,
              borderColor: colors.gray[900],
              color: colors.primary,
              svg: { color: colors.primary }
            }
          },
          {
            props: { color: 'primary' },
            style: {
              svg: { color: colors.white }
            }
          }
        ]
      },
      MuiChip: {
        defaultProps: {
          variant: 'filled'
        },
        variants: [
          {
            props: { variant: 'filled' },
            style: {
              color: 'white'
            }
          }
        ]
      },

      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            '.MuiTypography-root': {
              color: '#2B2B2B',
              fontWeight: 500
            }
          }
        }
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            textTransform: 'capitalize'
          }
        }
      },
      MuiRadio: {
        defaultProps: {
          checkedIcon: <RadioButtonCheckedTwoTone />,
          color: 'default'
        },
        variants: [
          {
            props: { color: 'primary' },
            style: {
              svg: {
                circle: {
                  r: 6.5
                }
              }
            }
          },
          {
            props: { color: 'default' },
            style: {
              color: '#2B2B2B'
            }
          }
        ]
      },
      MuiSwitch: {
        defaultProps: {
          color: 'primary',
          style: {
            color: colors.white
          }
        },
        styleOverrides: {
          root: {
            '& .MuiSwitch-thumb': {
              boxShadow: 'none',
              height: 16,
              margin: 2,
              width: 16
            },
            '& .MuiSwitch-track': {
              background: '#dfdfdf',
              borderRadius: 4,
              opacity: '1 !important'
            },
            '&.Mui-checked': {
              '& + .MuiSwitch-track': {
                backgroundColor: '#177ddc',
                opacity: 1
              },
              color: '#fff',
              transform: 'translateX(12px)'
            },
            padding: 8
          }
        }
      },
      MuiTableBody: {
        styleOverrides: {
          root: {
            backgroundColor: 'white'
          }
        }
      },
      MuiTextField: {
        defaultProps: {
          size: 'small'
        },
        styleOverrides: {
          root: {
            '& input:-webkit-autofill': {
              WebkitBoxShadow: '0 0 0 1000px transparent inset !important',
              transition: 'background-color 10000s ease-in-out'
            },
            '.MuiInputBase-input': {
              paddingLeft: '14px !important'
            },
            '.MuiInputBase-root': {
              backgroundColor: 'white',
              borderRadius: '4px'
            }
          }
        }
        // variants: [
        //   {
        //     props: { color: 'hide' },
        //     style: {
        //       '.MuiButtonBase-root': {
        //         background: colors.primary,
        //         svg: {
        //           color: colors.white
        //         }
        //       },
        //       '.MuiButtonBase-root:hover': {
        //         background: colors.primary,
        //         borderBottom: '0px solid black !important',
        //         cursor: 'pointer'
        //       },
        //       '.MuiInputBase-root': {
        //         background: 'transparent !important',
        //         borderBottom: '0px solid black !important',
        //         flexWrap: 'wrap',
        //         maxWidth: '100%',
        //         paddingRight: '0px !important',
        //         paddingTop: '12px'
        //       },
        //       '.MuiInputBase-root:after': {
        //         borderBottom: '0px solid black !important',
        //         cursor: 'pointer'
        //       },
        //       '.MuiInputBase-root:before': {
        //         borderBottom: '0px solid black !important'
        //       },
        //       '.MuiInputBase-root:hover': {
        //         borderBottom: '0px solid black !important',
        //         cursor: 'pointer'
        //       },
        //       '.MuiInputBase-root:hover:before': {
        //         borderBottom: '0px solid black !important',
        //         cursor: 'pointer'
        //       },
        //       input: {
        //         display: 'none'
        //       },
        //       paddingLeft: '0 !important'
        //     }
        //   },
        //   {
        //     props: { color: 'isSelect' },
        //     style: {
        //       '.MuiButtonBase-root': {
        //         background: colors.primary
        //       },
        //       '.MuiInputBase-root': {
        //         background: 'transparent !important',
        //         borderBottom: '0px !important',
        //         paddingRight: '8px !important',
        //         paddingTop: '12px'
        //       },
        //       '.MuiInputBase-root:before': {
        //         borderBottom: '0px !important'
        //       },

        //       input: {
        //         display: 'none'
        //       },
        //       paddingLeft: '0 !important'
        //     }
        //   },
        //   {
        //     props: { size: 'small' },
        //     style: {
        //       '.MuiInputBase-root': {
        //         maxHeight: '40px'
        //       }
        //     }
        //   }
        // ]
      }
    },
    palette: {
      divider: colors.primary,
      error: { main: colors.red },
      grey: colors.gray,
      info: { main: colors.info },
      primary: { main: colors.primary },
      secondary: { main: colors.secondary },
      success: { main: colors.success },
      warning: { main: colors.warning }
    },
    typography: { fontFamily: 'Nunito' }
  });

  return <ThemeProvider theme={LightTheme}>{children}</ThemeProvider>;
};
